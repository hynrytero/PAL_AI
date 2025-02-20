import React, { useState, useEffect } from "react";
import { TouchableOpacity, Alert, View, Text, SafeAreaView, ScrollView, ImageBackground, Image, RefreshControl } from 'react-native';
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { images } from "../../constants";
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';

const API_URL = 'https://pal-ai-database-api-sea-87197497418.asia-southeast1.run.app';

const Profile = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    contactNumber: '',
    birthdate: '',
    gender: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Check authentication and redirect if needed
  useEffect(() => {
    if (!user?.isAuthenticated) {
      router.replace('/sign-in');
    }
  }, [user?.isAuthenticated]);

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
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile();
    }
  }, [user?.id]);

  const onRefresh = React.useCallback(() => {
    if (user?.id) {
      setRefreshing(true);
      fetchUserProfile();
    }
  }, [user?.id]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) return 'Invalid date';
    
    // Format as YYYY-MM-DD
    return date.toISOString().split('T')[0];
  };

  if (!user?.isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 mb-4">{error}</Text>
        <Button mode="contained" onPress={onRefresh}>
          Retry
        </Button>
      </View>
    );
  }

  const displayName = userData.firstname && userData.lastname 
    ? `${userData.firstname}`
    : 'No name provided';

  return (
    <ImageBackground
      source={images.background_profile}
      className="flex-1 h-full w-full bg-white"
    >
      <ScrollView 
        className="mt-12"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <SafeAreaView className="px-7 w-full h-full mb-10">
          <View className="flex-row items-center justify-between w-full mb-3">
            <Text className="font-pmedium text-[30px]">Profile</Text>
          </View>

          <View className="w-full h-auto items-center justify-center mb-10">
            <Image
              source={userData.image ? { uri: userData.image } : images.Default_Profile}
              resizeMode="contain"
              className="w-[150px] h-[150px] rounded-[75px] overflow-hidden"
            />
            <Text className="text-3xl font-psemibold mt-5">
              {displayName}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-lg">About</Text>
            <TouchableOpacity onPress={() => router.push("/editprofile")}>
              <Text className="text-lg underline">Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col rounded-[5px] border border-[#474747] mt-5">
            <View className="flex-row justify-between m-3">
              <Text className="text-lg">Name</Text>
              <Text className="text-lg">{displayName}</Text>
            </View>
            <View className="flex-row justify-between mb-3 mx-3">
              <Text className="text-lg">Email</Text>
              <Text className="text-lg">{userData.email || 'Not provided'}</Text>
            </View>
            <View className="flex-row justify-between mb-3 mx-3">
              <Text className="text-lg">Contact Number</Text>
              <Text className="text-lg">{userData.contactNumber || 'Not provided'}</Text>
            </View>
            <View className="flex-row justify-between mb-3 mx-3">
              <Text className="text-lg">Birthdate</Text>
              <Text className="text-lg">{formatDate(userData.birthdate) || 'Not provided'}</Text>
            </View>
            <View className="flex-row justify-between mb-3 mx-3">
              <Text className="text-lg">Gender</Text>
              <Text className="text-lg">{userData.gender || 'Not provided'}</Text>
            </View>
          </View>
          
          <Button
            mode="outlined"
            style={{ borderRadius: 5, marginTop: 10 }}
            contentStyle={{ justifyContent: "flex-start" }}
            labelStyle={{ fontSize: 18, color: "black" }}
            onPress={() => router.push("/manage")}
          >
            Manage Account
          </Button>
          <Button
            mode="outlined"
            style={{ borderRadius: 5, marginTop: 10 }}
            contentStyle={{ justifyContent: "flex-start" }}
            labelStyle={{ fontSize: 18, color: "red" }}
            onPress={handleLogout}
          >
            Log-out
          </Button>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;