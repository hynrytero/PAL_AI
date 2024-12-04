import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { icons } from "../constants"; // Assuming you have an `icons` object in your constants

const CustomFAB = ({ onPress, iconSource, style }) => {
  return (
    <TouchableOpacity style={[styles.fab, style]} onPress={onPress}>
      <Image source={iconSource} style={styles.icon} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 40, // Adjust based on your tab bar height
    alignSelf: "center",
    backgroundColor: "#2C9C4B", // Green background for FAB
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: "#FFFFFF", // Makes the icon white (optional)
  },
});

export default CustomFAB;
