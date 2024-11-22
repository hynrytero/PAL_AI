import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import { images } from "../constants";

const Card = () => {
  return (
    <View style={styles.card}>
      <Image
        source={images.backgroundmain} // Replace this with your desired image URL
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.header}>Header</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </Text>
        <Text style={styles.timestamp}>8m ago</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
});

export default Card;
