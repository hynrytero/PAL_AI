import React, { useState } from "react";
import { TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { router } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack } from "expo-router"; // Make sure expo-router is installed and configured
import Icon from "react-native-vector-icons/MaterialIcons";
import { Avatar, Card, IconButton, Button } from "react-native-paper";

import { images } from "../../constants";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(images.angelo);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
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
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={profileImage}
                resizeMode="contain"
                className="w-[150px] h-[150px] rounded-[75px] overflow-hidden"
              />
            </TouchableOpacity>
            {/* This part is the username of user */}
            <Text className="text-3xl font-psemibold mt-5">angelodegams</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-lg">About</Text>
            <TouchableOpacity onPress={handleApplyChanges}>
              <Text className="text-lg underline">Apply Changes</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col rounded-[5px] border border-[#474747] mt-5 p-3">
            <View className="flex-row justify-between mb-3">
              <View style={{ width: '48%' }}>
                <Text style={{ fontSize: 18, color: 'black' }}>First Name</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#474747',
                    borderRadius: 5,
                    padding: 10,
                    fontSize: 18,
                    color: 'black',
                    marginTop: 5,
                  }}
                  placeholder="First Name"
                  placeholderTextColor="#474747"
                  value="Angelo"
                />
              </View>
              <View style={{ width: '48%' }}>
                <Text style={{ fontSize: 18, color: 'black' }}>Last Name</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#474747',
                    borderRadius: 5,
                    padding: 10,
                    fontSize: 18,
                    color: 'black',
                    marginTop: 5,
                  }}
                  placeholder="Last Name"
                  placeholderTextColor="#474747"
                  value="Degamo"
                />
              </View>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 18, color: 'black' }}>Birth Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#474747',
                    borderRadius: 5,
                    padding: 10,
                    fontSize: 18,
                    color: 'black',
                    marginTop: 5,
                  }}
                  placeholder="Birth Date"
                  placeholderTextColor="#474747"
                  value={birthDate.toDateString()}
                  editable={false}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 18, color: 'black' }}>Contact Number</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#474747',
                  borderRadius: 5,
                  padding: 10,
                  fontSize: 18,
                  color: 'black',
                  marginTop: 5,
                }}
                placeholder="Contact Number"
                placeholderTextColor="#474747"
                value="09123456789"
                keyboardType="numeric"
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;