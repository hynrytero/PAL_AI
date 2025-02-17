import React, { useState } from "react";
import { TouchableOpacity, TextInput, Alert, Modal, View, Text, SafeAreaView, ScrollView, ImageBackground, Image } from 'react-native';
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { images } from "../../constants";

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  // const handleDeleteAccount = () => {
  //   if (deleteText === "Delete") {
  //     // Perform account deletion logic here
  //     Alert.alert("Account Deleted", "Your account has been deleted.");
  //     setModalVisible(false);
  //     router.push("/sign-in"); // Navigate to the sign-in screen
  //   } else {
  //     Alert.alert("Error", "Please type 'Delete' to confirm.");
  //   }
  // };

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
            <TouchableOpacity onPress={() => router.push("/editprofile")}>
              <Text className="text-lg underline">Edit Profile</Text>
            </TouchableOpacity>
          </View>

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
            onPress={() => router.push("/manage")} // Navigate to the manage account screen
          >
            Manage Account
          </Button>
          <Button
            mode="outlined"
            style={{ borderRadius: 5, marginTop: 10 }} // Set corner radius
            contentStyle={{ justifyContent: "flex-start" }} // Align text to the left
            labelStyle={{ fontSize: 18, color: "black" }}
          >
            Log-out
          </Button>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;