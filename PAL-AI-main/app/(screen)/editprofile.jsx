import React from "react";
import { TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from "expo-router";
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
  const handleApplyChanges = () => {
    Alert.alert(
      "Confirm Changes",
      "Are you sure you want to apply these changes?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => router.push("/profile")
        }
      ]
    );
  };

  return (
    <ImageBackground
      source={images.background_profile}
      className="flex-1 h-full w-full bg-white"
    >
      <ScrollView className="mt-12">
        <SafeAreaView className="px-7 w-full h-full mb-10">
          <View className="flex-row items-center w-full mb-3">
            <Text className="font-pmedium text-[30px]">Edit Profile</Text>
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
            <TouchableOpacity onPress={handleApplyChanges}>
              <Text className="text-lg underline">Apply Changes</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col rounded-[5px] border border-[#474747] mt-5">
            <View className="flex-row justify-between m-3">
            <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#474747',
              borderRadius: 5,
              padding: 10,
              marginTop: 10,
              width: '100%',
              fontSize: 18,
              color: 'black'
            }}
            placeholder="Angelo Degamo"
            placeholderTextColor="#474747"
              />
            </View>
            <View className="flex-row justify-between mb-3 mx-3">
            <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#474747',
              borderRadius: 5,
              padding: 10,
              marginTop: 10,
              width: '100%',
              fontSize: 18,
              color: 'black'
            }}
            placeholder="angelogwapo@gmail.com"
            placeholderTextColor="#474747"
              />
            </View>
            <View className="flex-row justify-between mb-3 mx-3">
            <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#474747',
              borderRadius: 5,
              padding: 10,
              marginTop: 10,
              width: '100%',
              fontSize: 18,
              color: 'black'
            }}
            placeholder="09123456789"
            placeholderTextColor="#474747"
              />
            </View>
          </View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#474747',
              borderRadius: 5,
              padding: 10,
              marginTop: 10,
              fontSize: 18,
              color: 'black'
            }}
            secureTextEntry={true}
            placeholder="Current Password"
            placeholderTextColor="#474747"
          />
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#474747',
              borderRadius: 5,
              padding: 10,
              marginTop: 10,
              fontSize: 18,
              color: 'black'
            }}
            secureTextEntry={true}
            placeholder="New Password"
            placeholderTextColor="#474747"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#474747',
              borderRadius: 5,
              padding: 10,
              marginTop: 10,
              fontSize: 18,
              color: 'black'
            }}
            secureTextEntry={true}
            placeholder="Confirm Password"
            placeholderTextColor="#474747"
          />
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;