import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Slider from "@react-native-community/slider";
import Button from "../../components/CameraButton";
import { router } from "expo-router";

const API_URL = "http://192.168.1.38:8081/predict";

export default function App() {
  // Permissions hooks
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const [imagePickerPermission, requestImagePickerPermission] =
    ImagePicker.useMediaLibraryPermissions();

  // Camera and image state
  const [cameraProps, setCameraProps] = useState({
    zoom: 0,
    facing: "back",
    flash: "on",
    animateShutter: false,
    enableTorch: false,
  });
  const [image, setImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [predictions, setPredictions] = useState(null);

  // Camera reference
  const cameraRef = useRef(null);

  // Check and load last saved image on component mount
  useEffect(() => {
    if (
      cameraPermission?.granted &&
      mediaLibraryPermissionResponse?.status === "granted"
    ) {
      getLastSavedImage();
    }
  }, [cameraPermission, mediaLibraryPermissionResponse]);

  // Convert image to base64 for API transmission
  const imageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      throw error;
    }
  };

  // Send image to prediction API
  const sendImageToAPI = async (imageUri) => {
    try {
      setIsProcessing(true);
      const base64Image = await imageToBase64(imageUri);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPredictions(data.predictions);
      return data.predictions;
    } catch (error) {
      console.error("Error sending image to API:", error);
      Alert.alert("Error", "Failed to process image");
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  // Take picture from camera
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        setImage(picture.uri);
        // Automatically send to API when picture is taken
      } catch (err) {
        console.log("Error while taking/processing the picture:", err);
        Alert.alert("Error", "Failed to process image");
      }
    }
  };

  // Pick image from gallery
  const pickImageFromGallery = async () => {
    try {
      // Request permission if not already granted
      if (!imagePickerPermission?.granted) {
        const permissionResult = await requestImagePickerPermission();
        if (!permissionResult.granted) {
          Alert.alert(
            "Permission Required",
            "Gallery access is needed to select images."
          );
          return;
        }
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setImage(selectedImage.uri);

        // Send selected image to API
        // const predictions = await sendImageToAPI(selectedImage.uri)
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image");
    }
  };

  // Save picture to device gallery
  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        //Alert.alert("Success", "Photo saved!");
        // setImage(null);
        // setPredictions(null);
        getLastSavedImage();

        //send values to database

        //send result values to result window

        router.push("result");
      } catch (err) {
        console.log("Error while saving the picture:", err);
        Alert.alert("Error", "Failed to save picture");
      }
    }
  };

  // Retrieve last saved image from gallery
  const getLastSavedImage = async () => {
    if (
      mediaLibraryPermissionResponse &&
      mediaLibraryPermissionResponse.status === "granted"
    ) {
      const dcimAlbum = await MediaLibrary.getAlbumAsync("DCIM");

      if (dcimAlbum) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: dcimAlbum,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
          mediaType: MediaLibrary.MediaType.photo,
          first: 1,
        });

        if (assets.length > 0) {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(assets[0].id);
          setPreviousImage(assetInfo.localUri || assetInfo.uri);
        } else {
          setPreviousImage(null);
        }
      } else {
        setPreviousImage(null);
      }
    }
  };

  // Toggle camera properties
  const toggleProperty = (prop, option1, option2) => {
    setCameraProps((current) => ({
      ...current,
      [prop]: current[prop] === option1 ? option2 : option1,
    }));
  };

  // Zoom controls
  const zoomIn = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.min(current.zoom + 0.1, 1),
    }));
  };

  const zoomOut = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.max(current.zoom - 0.1, 0),
    }));
  };

  // Permission check
  if (!cameraPermission || !mediaLibraryPermissionResponse) {
    return <View />;
  }

  // Permission request screen
  if (
    !cameraPermission.granted ||
    mediaLibraryPermissionResponse.status !== "granted"
  ) {
    return (
      <View style={styles.container}>
        <View style={styles.grantContainer}>
          <Text>We need camera and gallery permissions to continue.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              requestCameraPermission();
              requestMediaLibraryPermission();
            }}
          >
            <Text style={styles.buttonText}>Grant Permissions</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          {/* Top Camera Controls */}
          <View style={styles.topControlsContainer}>
            <Button icon="arrow-back" onPress={() => router.push("/home")} />
            <Button
              icon={cameraProps.flash === "on" ? "flash-on" : "flash-off"}
              onPress={() => toggleProperty("flash", "on", "off")}
            />
            <Button
              icon="animation"
              color={cameraProps.animateShutter ? "white" : "#404040"}
              onPress={() => toggleProperty("animateShutter", true, false)}
            />
            <Button
              icon={
                cameraProps.enableTorch ? "flashlight-on" : "flashlight-off"
              }
              onPress={() => toggleProperty("enableTorch", true, false)}
            />
          </View>

          {/* Camera View */}
          <CameraView
            style={styles.camera}
            zoom={cameraProps.zoom}
            facing={cameraProps.facing}
            flash={cameraProps.flash}
            animateShutter={cameraProps.animateShutter}
            enableTorch={cameraProps.enableTorch}
            ref={cameraRef}
          />

          {/* Zoom Slider */}
          <View style={styles.sliderContainer}>
            <Button icon="zoom-out" onPress={zoomOut} />
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={cameraProps.zoom}
              onValueChange={(value) =>
                setCameraProps((current) => ({ ...current, zoom: value }))
              }
              step={0.1}
            />
            <Button icon="zoom-in" onPress={zoomIn} />
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControlsContainer}>
            {/* <TouchableOpacity
              onPress={() => previousImage && setImage(previousImage)}
            >
              <Image
                source={{ uri: previousImage }}
                style={styles.previousImage}
              />
            </TouchableOpacity> */}
            <Button
              icon="photo-library"
              onPress={pickImageFromGallery}
              size={40}
            />
            <Button
              icon="camera"
              size={60}
              style={{ height: 60 }}
              onPress={takePicture}
            />
            <Button
              icon="flip-camera-ios"
              onPress={() => toggleProperty("facing", "front", "back")}
              size={40}
            />
          </View>
        </>
      ) : (
        <>
          {/* Image Preview */}
          <Image source={{ uri: image }} style={styles.camera} />

          {/* Processing Overlay */}
          {isProcessing && (
            <View style={styles.processingOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.processingText}>Processing Image...</Text>
            </View>
          )}

          {/* Image Preview Controls */}
          <View style={styles.bottomControlsContainer}>
            <Button icon="arrow-back" onPress={() => router.push("camera")} />
            <Button
              icon="photo-library"
              onPress={() => {
                setImage(null);
                setPredictions(null);
                pickImageFromGallery();
              }}
            />
            <Button
              icon="check"
              onPress={async () => {
                try {
                  // Optional: Add any pre-save processing or validation
                  const predictionsResult = await sendImageToAPI(image);
                  console.log("Predictions:", predictionsResult);
                  await savePicture();
                } catch (error) {
                  console.error("Error saving picture:", error);
                }
              }}
            />
          </View>
        </>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  grantContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topControlsContainer: {
    height: 100,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderContainer: {
    position: "absolute",
    bottom: 270,
    left: 20,
    right: 20,
    flexDirection: "row",
  },
  bottomControlsContainer: {
    height: 250,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  previousImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  processingText: {
    color: "#ffffff",
    marginTop: 10,
    fontSize: 16,
  },
  predictionsContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  predictionsText: {
    color: "#ffffff",
    fontSize: 14,
  },
});
