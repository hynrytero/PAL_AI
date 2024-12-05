<<<<<<< HEAD
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link, Redirect, router, Router, useLocalSearchParams } from "expo-router";
=======
import { View, Text, Image, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Link, Redirect, router, Router } from "expo-router";

>>>>>>> d90cc904ae4c3186c465f5b67d94e496432d80d3
import React from "react";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";

<<<<<<< HEAD

const Result = () => {

  // Get the params passed from the previous screen
  const params = useLocalSearchParams();
  console.log('Received params:', params);
  console.log('Image URI type:', typeof imageUri);
  console.log('Image URI value:', imageUri);
  console.log('FULL PARAMS:', JSON.stringify(params, null, 2));

  const { 
    imageUri = null, 
    disease = "Unknown Disease", 
    confidence = "0%", 
    date = new Date().toLocaleDateString(), 
    description = "No description available",
    treatments = "No description available" 
  } = params;
  
  console.log('EXTRACTED imageUri:', imageUri);
  return (
    <SafeAreaView className="flex-1">
       <ScrollView 
        className="flex-1 p-5"
        contentContainerStyle={{ 
          flexGrow: 1, 
          paddingBottom: 50
        }}
        showsVerticalScrollIndicator={false} 
      >
        {/* Header */}
        <View className="flex-row items-center w-full mb-7">
          <Icon
            name="chevron-left"
            size={40}
            color="black"
            onPress={() => router.back()}
          />
          <Text className="font-pmedium text-[30px]">Result</Text>
        </View>

        {/* Image */}
        <Image
          source={imageUri ? { uri: imageUri } : require("../../assets/images/background1.jpg")} // Replace with your fallback image path
          resizeMode="cover"
          className="w-full h-[275px] mb-5"
          borderRadius={10}
          onError={(e) => console.error("Image load error:", e.nativeEvent.error)}
          onLoad={() => console.log("Image loaded successfully")}
        />

        {/* Disease and Date */}
        <View className="flex-row justify-between w-full items-center mb-5">
          <Text className="font-pmedium text-[25px]">{disease}</Text>
          <Text className="font-pregular text-sm">{date}</Text>
        </View>

        {/* Confidence */}
        <Text className="font-pregular text-lg mb-5">{confidence}</Text>

        {/* Description */}
        <Text className="font-pregular text-md leading-6">{description}</Text>

        {/* Treatments Button */}
          <CustomButton
            title="Treatments"
            handlePress={() => router.push({
              pathname: "/treatment",
              params: {
                imageUri: imageUri,
                disease: disease || "Unknown Disease", 
                confidence: confidence, 
                date: new Date().toLocaleDateString(),
                description: description, 
                treatments: treatments || "No treatments available",
              }
            })}
            containerStyles="w-full mt-6"
          />
      </ScrollView>
    </SafeAreaView>
=======
const result = () => {
  return (
    <ImageBackground
      source={images.background_result}
      className="flex-1 h-full w-full bg-white"
    >
      <View className="flex-1 h-full w-full">
        <SafeAreaView className="px-7 pt-3 w-full h-full">
          <View className="flex-row items-center w-full mb-7">
            <Icon name="chevron-left" size={40} color="black" />
            <Text className="font-pmedium text-[30px]">Result</Text>
          </View>
          <Image
            source={images.background1}
            resizeMode="cover"
            className="w-full h-[275px] mb-5"
            borderRadius={10}
          />
          <View className="flex-row justify-between w-full items-center mb-5">
            <Text className="font-pmedium text-[25px]">Rice Tungro</Text>
            <Text className="font-pregular text-sm">Today</Text>
          </View>
          <Text className="font-pregular text-lg mb-5">98%</Text>
          <Text className="font-pregular text-md leading-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
            iste eum tempore optio, dicta illo quas sequi quibusdam aperiam?
            Consectetur laboriosam ipsum hic odio aliquid ullam ducimus
            consequatur ab debitis?
          </Text>
          <CustomButton
            title="Treatments"
            //Ichange lang dri if need muregister {handleSignup}, if deretso sa home kay () => router.push("/sign-up")
            handlePress={() => router.push("treatment")}
            containerStyles="w-full mt-6"
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
>>>>>>> d90cc904ae4c3186c465f5b67d94e496432d80d3
  );
};

export default Result;