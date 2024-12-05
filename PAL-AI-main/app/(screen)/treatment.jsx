import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";

const Treatment = () => {
  // Get the params passed from the previous screen
  const { 
    imageUri = null, 
    disease = "Unknown Disease", 
    confidence = "0%", 
    date = new Date().toLocaleDateString(), 
    description = "No description available",
    treatments = "No treatments available"
  } = useLocalSearchParams();

  return (
    <View className="flex-1 h-full w-full pt-7">
      <SafeAreaView className="w-full h-full">
        <ScrollView className="px-7">
          {/* Back navigation */}
          <View className="flex-row items-center w-full mb-7">
            <Icon 
              name="chevron-left" 
              size={40} 
              color="black" 
              onPress={() => router.back()}
            />
            <Text className="font-pmedium text-[30px]">Treatments</Text>
          </View>

          {/* Dynamic Image */}
          <Image
            source={imageUri ? { uri: imageUri } : images.background1}
            resizeMode="cover"
            className="w-full h-[275px] mb-5"
            borderRadius={10}
          />

          {/* Disease Name */}
          <View className="justify-center items-center">
            <Text className="font-pmedium text-[25px] text-center">
              {disease} Treatment
            </Text>
          </View>

          {/* Treatments Description */}
          <Text className="font-pregular text-md leading-6 mb-5">
            {treatments}
          </Text>

          {/* Instructions section */}
          <Text className="font-psemibold text-md mb-5">Instructions</Text>
          <Text className="font-pregular text-md leading-6 mb-5">
            {/* You can customize or dynamically populate these instructions */}
            1. Consult with a healthcare professional or agricultural expert. {"\n"}
            2. Follow recommended treatment protocols. {"\n"}
            3. Monitor progress and adjust treatment as necessary.
          </Text>

          <CustomButton
            title="Store Nearby"
            handlePress={() => router.push("nearby")}
            containerStyles="w-full my-6"
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Treatment;