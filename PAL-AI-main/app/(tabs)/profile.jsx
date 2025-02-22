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
    if (isNaN(date.getTime())) return 'Invalid date';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
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
    ? `${userData.firstname} ${userData.lastname}`
    : 'No name provided';

    return (
      <ImageBackground
        source={images.background_profile}
        className="flex-1 h-full w-full bg-white"
      >
        <ScrollView
          className="mt-12"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <SafeAreaView className="px-6 w-full h-full mb-10">
            <View className="flex-row items-center justify-between w-full mb-6">
              <Text className="font-bold text-[32px] text-gray-800">Profile</Text>
            </View>
  
            <View className="w-full items-center mb-8">
              <Image
                source={userData.image ? { uri: userData.image } : images.Default_Profile}
                resizeMode="cover"
                className="w-[140px] h-[140px] rounded-full border-4 border-gray-300 shadow-md"
              />
              <Text className="text-2xl font-semibold text-gray-900 mt-4">
                {userData.firstname}
              </Text>
            </View>
  
            <View className="w-full bg-white rounded-lg shadow-lg p-4 mb-8 border border-gray-200">
              <Text className="text-xl font-semibold text-gray-800 mb-3">About</Text>
  
              {[
                { label: "Name", value: displayName },
                { label: "Email", value: userData.email || "Not provided" },
                { label: "Contact Number", value: userData.contactNumber || "Not provided" },
                { label: "Birthdate", value: formatDate(userData.birthdate) || "Not provided" },
                { label: "Gender", value: userData.gender || "Not provided" },
              ].map((item, index) => (
                <View
                  key={index}
                  className={`flex-row justify-between py-3 border-b ${index === 4 ? "border-0" : "border-gray-200"}`}
                >
                  <Text className="text-base text-gray-600">{item.label}</Text>
                  <Text className="text-base font-medium text-gray-800">{item.value}</Text>
                </View>
              ))}
            </View>
  
            {[ 
              { label: "Edit Profile", route: "/editprofile" },
              { label: "Manage Account", route: "/manage" }
            ].map((item, index) => (
              <Button
                key={index}
                mode="outlined"
                style={{ borderRadius: 8, marginVertical: 6 }}
                contentStyle={{ justifyContent: "center", paddingVertical: 8 }}
                labelStyle={{ fontSize: 16, color: "#1f2937" }}
                onPress={() => router.push(item.route)}
              >
                {item.label}
              </Button>
            ))}
  
            <Button
              mode="outlined"
              style={{ borderRadius: 8, marginTop: 12 }}
              contentStyle={{ justifyContent: "center", paddingVertical: 8 }}
              labelStyle={{ fontSize: 16, color: "#dc2626" }}
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