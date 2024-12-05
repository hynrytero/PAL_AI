import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Slider from "@react-native-community/slider";
import Button from "../../components/CameraButton";
import { router } from "expo-router";
<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://192.168.1.2:5000/predict";
const API_DB = "http://192.168.1.2:5000/scan";

=======
>>>>>>> d90cc904ae4c3186c465f5b67d94e496432d80d3

export default function App() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
<<<<<<< HEAD
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const [imagePickerPermission, requestImagePickerPermission] = ImagePicker.useMediaLibraryPermissions();
  const { user } = useAuth();

  // Camera and image state
=======
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
>>>>>>> d90cc904ae4c3186c465f5b67d94e496432d80d3
  const [cameraProps, setCameraProps] = useState({
    zoom: 0,
    facing: "back",
    flash: "on",
    animateShutter: false,
    enableTorch: false,
  });
  const [image, setImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);

  const cameraRef = useRef(null);

  //to load the last saved image when permissions change
  useEffect(() => {
    if (
      cameraPermission &&
      cameraPermission.granted &&
      mediaLibraryPermissionResponse &&
      mediaLibraryPermissionResponse.status === "granted"
    ) {
      getLastSavedImage();
    }
  }, [cameraPermission, mediaLibraryPermissionResponse]);

  if (!cameraPermission || !mediaLibraryPermissionResponse) {
    // Permissions are still loading.
    return <View />;
  }

  if (
    !cameraPermission.granted ||
    mediaLibraryPermissionResponse.status !== "granted"
  ) {
    // Permissions are not granted yet.
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

  //function to toggle camera properties
  const toggleProperty = (prop, option1, option2) => {
    setCameraProps((current) => ({
      ...current,
      [prop]: current[prop] === option1 ? option2 : option1,
    }));
  };

  //function to zoom in
  const zoomIn = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.min(current.zoom + 0.1, 1),
    }));
  };

  //function to zoom out
  const zoomOut = () => {
    setCameraProps((current) => ({
      ...current,
      zoom: Math.max(current.zoom - 0.1, 0),
    }));
  };

  //function to take a picture and show it without saving it
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        setImage(picture.uri);
      } catch (err) {
        console.log("Error while taking the picture : ", err);
      }
    }
  };

<<<<<<< HEAD
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

=======
  //function to save the picture using MediaLibrary
>>>>>>> d90cc904ae4c3186c465f5b67d94e496432d80d3
  const savePicture = async () => {

    if (image) {
      try {

        const predictionsResult = await sendImageToAPI(image);
        const asset = await MediaLibrary.createAssetAsync(image);
<<<<<<< HEAD
       // console.log("Predictions:", predictionsResult);
        
        try {
            const response = await fetch(API_DB, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_profile_id: user.id,
                    disease_prediction: predictionsResult[0].class_name,
                    disease_prediction_score: predictionsResult[0].confidence,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Data saved to the database successfully');
            } else {
                console.error('Error saving data to the database:', response.status, data);
                Alert.alert('Error', data.message || 'Failed to save data to the database');
            }
        } catch (error) {
            console.error('Network error:', error);
            Alert.alert('Error', 'Network error occurred while saving data');
        }

        // Navigate to result screen with the data  
        router.push({
        pathname: "/result",
        params: {
          imageUri: image,
          disease: predictionsResult[0]?.class_name || "Unknown Disease", 
          confidence: `${(predictionsResult[0]?.confidence * 100).toFixed(2)}%` || "0%", 
          date: new Date().toLocaleDateString(),
          description: predictionsResult[0]?.description || "No description available", 
          treatments:  predictionsResult[0]?.treatments || "No treatments available",
        }
      });

=======
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
        Alert.alert("Photo saved!", image);
        setImage(null);
        getLastSavedImage();
>>>>>>> d90cc904ae4c3186c465f5b67d94e496432d80d3
      } catch (err) {
        console.log("Error while saving the picture : ", err);
      }
    }
  };

  //function to get the last saved image from the 'DCIM' album created in the gallery by expo
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

  return (
    <View className="flex-1 h-full pt-7">
      {!image ? (
        <>
          <View style={styles.topControlsContainer}>
            <Button icon={"arrow-back"} onPress={() => router.push("home")} />
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
          <CameraView
            style={styles.camera}
            zoom={cameraProps.zoom}
            facing={cameraProps.facing}
            flash={cameraProps.flash}
            animateShutter={cameraProps.animateShutter}
            enableTorch={cameraProps.enableTorch}
            ref={cameraRef}
          />
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
          <View style={styles.bottomControlsContainer}>
            <TouchableOpacity
              onPress={() => previousImage && setImage(previousImage)}
            >
              <Image
                source={{ uri: previousImage }}
                style={styles.previousImage}
              />
            </TouchableOpacity>

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
          <Image source={{ uri: image }} style={styles.camera} />
          <View style={styles.bottomControlsContainer}>
<<<<<<< HEAD
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
                  await savePicture();
                } catch (error) {
                  console.error("Error saving picture:", error);
                }
              }}
            />
=======
            <Button icon="flip-camera-android" onPress={() => setImage(null)} />
            <Button icon="check" onPress={savePicture} />
>>>>>>> d90cc904ae4c3186c465f5b67d94e496432d80d3
          </View>
        </>
      )}
    </View>
  );
}

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
});
