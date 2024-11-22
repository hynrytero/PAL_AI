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
    bottom: 20,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#228B22", // Default FAB color
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 4, // Shadow for Android
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: "#FFFFFF", // Makes the icon white (optional)
  },
});

export default CustomFAB;
