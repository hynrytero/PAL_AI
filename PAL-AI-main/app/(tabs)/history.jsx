import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import Card from "../../components/Card";
import { images } from "../../constants";
import { useAuth } from "../../context/AuthContext";

const API_URL = 'https://pal-ai-database-api-sea-87197497418.asia-southeast1.run.app';

const History = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const {user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchScanHistory();
  }, []);

  const fetchScanHistory = async () => {
    try {
      if (!user.id) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`${API_URL}/api/scan-history/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch scan history');
      }

      const data = await response.json();
      setScans(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'Failed to load scan history. Please try again later.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchScanHistory();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCardPress = useCallback(async (scan) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    
    router.push({
      pathname: "/result",
      params: {
        imageUri: scan.image,
        disease: scan.disease,
        confidence: `${scan.confidence}%`,
        date: formatDate(scan.date),
        description: scan.diseaseDescription,
        treatments: scan.medicineDescription,
        fromHistory: true
      }
    });

    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  }, [isNavigating]);

  return (
    <ImageBackground
      source={images.background_history}
      className="flex-1 h-full w-full bg-white"
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
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
          <View className="flex-row items-center w-full mb-3">
            <Text className="font-pmedium text-[30px]">History</Text>
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color="#ADD8E6" />
          ) : scans.length > 0 ? (
            scans.map((scan) => (
              <TouchableOpacity
                key={scan.id}
                onPress={() => handleCardPress(scan)}
                activeOpacity={0.7}
                disabled={isNavigating}
              >
                <Card
                  disease={scan.disease}
                  desc={scan.diseaseDescription}
                  date={formatDate(scan.date)}
                  percent={scan.confidence.toString()}
                  color="bg-[#ADD8E6]"
                  image={{ uri: scan.image }}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-center mt-4">No scan history found</Text>
          )}
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

export default History;