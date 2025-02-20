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
  Button,
} from "react-native";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/MaterialIcons";
import { images } from "../../constants";
import Feather from "react-native-vector-icons/Feather";
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
      const date = new Date(userData.birthdate);
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      setBirthDate(new Date(date.getTime() + userTimezoneOffset));
    }
  }, [userData]);

  const formatDateForServer = (date) => {
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
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
      <ScrollView className="mt-12">
         <SafeAreaView className="px-7 w-full h-full mb-10">
                {/* New Header */}
            <View className="flex-row items-center w-full mb-7">
               <Feather
                  name="chevron-left"
                  size={40}
                  color="black"
                  onPress={handleBack}
               />
             <Text className="font-pmedium text-[30px]">Edit Profile</Text>
           </View>

          {/* Enhanced Profile Picture Section */}
          <View className="w-full h-auto items-center justify-center mb-10">
            <View style={styles.profileImageContainer}>
              <TouchableOpacity 
                onPress={pickImage}
                style={styles.imageWrapper}
              >
                <Image
                  source={
                    profileImage
                      ? { uri: profileImage }
                      : userData.image
                        ? { uri: userData.image }
                        : images.Default_Profile
                  }
                  resizeMode="contain"
                  style={styles.profileImage}
                />
                <View style={styles.editIconContainer}>
                  <Icon name="camera-alt" size={20} color="white" />
                </View>
                <View style={styles.editOverlay} />
              </TouchableOpacity>
            </View>
            <Text className="text-3xl font-psemibold mt-5">{userData.firstname}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-lg">About</Text>
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
                  placeholder="Firstname"
                  placeholderTextColor="#474747"
                  value={firstName}
                  onChangeText={setFirstName}
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
                  placeholder="Lastname"
                  placeholderTextColor="#474747"
                  value={lastName}
                  onChangeText={setLastName}
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
                value={contactNumber}
                onChangeText={setContactNumber}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Button title="Apply Changes" onPress={handleApplyChanges} />
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