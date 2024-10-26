import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useRef, userEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Slider from "@react-native-community/slider";

export default function camera() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();

  if (!cameraPermission || !mediaLibraryPermission) {
    //Permission are still loading
    return <View />;
  }
  if (
    !cameraPermission.granted ||
    mediaLibraryPermission.status !== "granted"
  ) {
    //Permission are not granted yet
    return (
      <View style={styles.container}>
        <Text>We need your permissions to continue.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestMediaLibraryPermission();
            requestCameraPermission();
          }}
        >
          <Text style={styles.buttonText}>Grant permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});
