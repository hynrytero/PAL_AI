import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import { Stack } from "expo-router"; // Make sure expo-router is installed and configured
import Icon from "react-native-vector-icons/MaterialIcons";
import { Avatar, Card, IconButton, Button } from "react-native-paper";

import { images } from "../../constants";

const Profile = () => {
  return (
    <ImageBackground
      source={images.background_profile}
      className="flex-1 h-full w-full bg-white"
    >
      <ScrollView className="mt-12">
        <SafeAreaView className="px-7 w-full h-full mb-10">
          <View className="flex-row items-center w-full mb-3">
            <Text className="font-pmedium text-[30px]">Profile</Text>
          </View>
          <View className="w-full h-auto items-center justify-center mb-10">
            <Image
              source={images.angelo}
              resizeMode="contain"
              className="w-[150px] h-[150px] rounded-[75px] overflow-hidden"
            />
            {/* This part is the username of user */}
            <Text className="text-3xl font-psemibold mt-5">angelodegams</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg">About</Text>
            <Text className="text-lg underline">Edit Profile</Text>
          </View>
          {/* This part is the basic info of the user */}
          <View className="flex-col rounded-[5px] border border-[#474747] mt-5">
            <View className="flex-row justify-between m-3">
              <Text className="text-lg">Full Name</Text>
              <Text className="text-lg">Angelo Degamo</Text>
            </View>
            <View className="flex-row justify-between mb-3 mx-3">
              <Text className="text-lg">Email</Text>
              <Text className="text-lg">angelogwapo@gmail.com</Text>
            </View>
            <View className="flex-row justify-between mb-3 mx-3">
              <Text className="text-lg">Contact Number</Text>
              <Text className="text-lg">09123456789</Text>
            </View>
          </View>
          <Button
            mode="outlined"
            style={{ borderRadius: 5, marginTop: 10 }} // Set corner radius
            contentStyle={{ justifyContent: "flex-start" }} // Align text to the left
            labelStyle={{ fontSize: 18, color: "black" }}
          >
            Change Password
          </Button>
          <Button
            mode="outlined"
            style={{ borderRadius: 5, marginTop: 10 }} // Set corner radius
            contentStyle={{ justifyContent: "flex-start" }} // Align text to the left
            labelStyle={{ fontSize: 18, color: "black" }}
          >
            Log-out
          </Button>
          <Button
            mode="outlined"
            style={{ borderRadius: 5, marginTop: 10 }} // Set corner radius
            contentStyle={{ justifyContent: "flex-start" }} // Align text to the left
            labelStyle={{ fontSize: 18, color: "red" }}
          >
            Delete Account
          </Button>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
