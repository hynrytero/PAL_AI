import React, { useState, useEffect } from "react";
import { TouchableOpacity, TextInput, Alert, Platform, StyleSheet } from 'react-native';
import { router } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/MaterialIcons";
import { images } from "../../constants";
import Feather from "react-native-vector-icons/Feather";
import { Button } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";

const API_URL = 'https://pal-ai-database-api-sea-87197497418.asia-southeast1.run.app';

const Profile = () => {
   const { user } = useAuth();
   const [userData, setUserData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      contactNumber: '',
      birthdate: '',
      gender: '',
      image: '',
    });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [contactNumber, setContactNumber] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
 
  const fetchUserProfile = async () => {
    try {
      setError(null);
      
      const response = await axios.get(`${API_URL}/api/profile/${user.id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch profile data');
      }
    } catch (error) {
      setError(error.message || 'Failed to load profile data');
      Alert.alert(
        'Error',
        error.message,
        [{ text: 'OK', onPress: () => setError(null) }]
      );
    } 
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile();
    }
  }, [user?.id]);

  useEffect(() => {
    setFirstName(userData.firstname);
    setLastName(userData.lastname);
    setContactNumber(userData.contactNumber);
    
    if (userData.birthdate) {
      setBirthDate(new Date(userData.birthdate));
    }
  }, [userData]);

  const formatDateForServer = (date) => {
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - timezoneOffset);
    return localDate.toISOString().split('T')[0];
  };


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
          onPress: async () => {
            try {
              let imageUrl = userData.image; // Default to existing image
  
              // If there's a new profile image, upload it first
              if (profileImage && profileImage !== userData.image) {
                const formData = new FormData();
                formData.append('image', {
                  uri: profileImage,
                  type: 'image/jpeg',
                  name: 'profile.jpg'
                });
  
                const uploadResponse = await fetch(`${API_URL}/upload-profile`, {
                  method: 'POST',
                  body: formData,
                });
  
                if (!uploadResponse.ok) {
                  throw new Error('Failed to upload image');
                }
  
                const uploadResult = await uploadResponse.json();
                imageUrl = uploadResult.imageUrl;
              }
  
              // Prepare updated profile data
              const updatedProfile = {
                userId: user.id,
                firstname: firstName,
                lastname: lastName,
                birthdate: formatDateForServer(birthDate),
                contactNumber: contactNumber,
                image: imageUrl
              };
  
              // Send update request
              const updateResponse = await axios.put(
                `${API_URL}/api/profile/update`,
                updatedProfile,
                {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              );
  
              if (updateResponse.data.success) {
                Alert.alert(
                  "Success",
                  "Profile updated successfully",
                  [
                    {
                      text: "OK",
                      onPress: () => router.back()
                    }
                  ]
                );
              } else {
                throw new Error(updateResponse.data.message || 'Failed to update profile');
              }
            } catch (error) {
              console.error('Update failed:', error);
              Alert.alert(
                "Error",
                error.message || "Failed to update profile",
                [{ text: "OK" }]
              );
            }
          }
        }
      ]
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };

  const handleBack = () => {
      router.back();
  };

  return (
    <ImageBackground
      source={images.background_profile}
      className="flex-1 h-full w-full bg-white"
    >
      <ScrollView className="mt-10">
        <SafeAreaView className="px-6 w-full h-full mb-12">
          {/* Header */}
          <View className="flex-row items-center mb-6">
            <Feather name="chevron-left" size={36} color="black" onPress={handleBack} />
            <Text className="font-bold text-[28px] ml-3 text-gray-800">Edit Profile</Text>
          </View>

          {/* Profile Picture */}
          <View className="items-center mb-8">
            <TouchableOpacity onPress={pickImage} className="relative">
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : userData.image
                    ? { uri: userData.image }
                    : images.Default_Profile
                }
                resizeMode="cover"
                className="w-[140px] h-[140px] rounded-full border-4 border-gray-300 shadow-md"
              />
              <View className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-2">
                <Icon name="camera-alt" size={20} color="white" />
              </View>
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-gray-900 mt-4">
              {userData.firstname}
            </Text>
          </View>

          {/* About Section */}
          <View className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <Text className="text-xl font-semibold text-gray-800 mb-4">About</Text>

            {/* First and Last Name */}
            <View className="flex-row justify-between mb-4">
              <View className="w-[48%]">
                <Text className="text-base text-gray-700">First Name</Text>
                <TextInput
                  className="border border-gray-400 rounded-md p-2 mt-2 text-base text-gray-800"
                  placeholder="Firstname"
                  placeholderTextColor="#9ca3af"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View className="w-[48%]">
                <Text className="text-base text-gray-700">Last Name</Text>
                <TextInput
                  className="border border-gray-400 rounded-md p-2 mt-2 text-base text-gray-800"
                  placeholder="Lastname"
                  placeholderTextColor="#9ca3af"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>

            {/* Birth Date */}
            <View className="mb-4">
              <Text className="text-base text-gray-700">Birth Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  className="border border-gray-400 rounded-md p-2 mt-2 text-base text-gray-800"
                  placeholder="Birth Date"
                  placeholderTextColor="#9ca3af"
                  value={birthDate ? birthDate.toDateString() : ""}
                  editable={false}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={birthDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>

            {/* Contact Number */}
            <View className="mb-2">
              <Text className="text-base text-gray-700">Contact Number</Text>
              <TextInput
                className="border border-gray-400 rounded-md p-2 mt-2 text-base text-gray-800"
                placeholder="Contact Number"
                placeholderTextColor="#9ca3af"
                value={contactNumber}
                onChangeText={setContactNumber}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Apply Changes Button */}
          <View className="mt-6">
            <Button
              mode="contained"
              style={{ borderRadius: 8, backgroundColor: "#1d4ed8" }}
              contentStyle={{ paddingVertical: 10 }}
              labelStyle={{ fontSize: 16, fontWeight: "bold" }}
              onPress={handleApplyChanges}
            >
              {"Apply Changes"}
            </Button>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    position: 'relative',
    width: 150,
    height: 150,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  editOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 75,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default Profile;