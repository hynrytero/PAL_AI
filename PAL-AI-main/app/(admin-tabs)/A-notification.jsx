import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Stack } from "expo-router"; // Make sure expo-router is installed and configured
import Icon from "react-native-vector-icons/MaterialIcons";
import { Avatar, Card, IconButton } from "react-native-paper";

import { images } from "../../constants";

const Notification = () => {
  return (
    <ImageBackground
      source={images.background_history}
      className="flex-1 h-full w-full bg-white"
    >
      <ScrollView className="mt-12">
        <SafeAreaView className="px-7 w-full h-full mb-10">
          <View className="flex-row items-center w-full mb-3">
            <Text className="font-pmedium text-[30px]">Notification</Text>
          </View>
          <Text className="font-psemibold">December 6, 2024</Text>
          <Card.Title
            title="Nearby Disease Alert"
            subtitle="Farmer Joemar has detected rice tungro disease with 95% accuracy."
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="leaf"
                style={{ backgroundColor: "red" }}
              />
            )}
            right={(props) => (
              <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
            )}
          />
          <Card.Title
            title="Heave rainfall detected"
            subtitle="Crops at risk of flooding or destruction."
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="weather-rainy"
                color="white"
                style={{ backgroundColor: "gray" }}
              />
            )}
            right={(props) => (
              <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
            )}
          />
          <Text className="font-psemibold">December 3, 2024</Text>
          <Card.Title
            title="Nearby Disease Alert"
            subtitle="Farmer Angelo has detected rice leaf blast disease with 89% accuracy."
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="leaf"
                style={{ backgroundColor: "red" }}
              />
            )}
            right={(props) => (
              <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
            )}
          />
          <Text className="font-psemibold">November 30, 2024</Text>
          <Card.Title
            title="Heatwave warning"
            subtitle="Prolonged sun exposure may affect crop health."
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="weather-sunny"
                color="white"
                style={{ backgroundColor: "#FFD700" }}
              />
            )}
            right={(props) => (
              <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
            )}
          />
          <Text className="font-psemibold">November 25, 2024</Text>
          <Card.Title
            title="Nearby Disease Alert"
            subtitle="Farmer Angelo has detected rice leaf blast disease with 89% accuracy."
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="leaf"
                style={{ backgroundColor: "red" }}
              />
            )}
            right={(props) => (
              <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
            )}
          />
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

export default A-Notification;
