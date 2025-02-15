import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link, Redirect, router, Router, useLocalSearchParams } from "expo-router";
import React from "react";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";

const Result = () => {
  const params = useLocalSearchParams();
  const {
    imageUri = null,
    disease = "Unknown Disease",
    confidence = "0%",
    date = new Date().toLocaleDateString(),
    description = "No description available",
    treatments = "No treatments available",
    fromHistory = false, 
  } = params;

  const handleBack = () => {
    if (fromHistory === "true") {
      router.back();
    } else {
      router.push("/camera");
    }
  };

  return (
    <ImageBackground
      source={images.background_result}
      className="flex-1 h-full"
      resizeMode="cover"
      imageStyle={{}}
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1 p-5"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="flex-row items-center w-full mb-7">
            <Icon
              name="chevron-left"
              size={40}
              color="black"
              onPress={handleBack}
            />
            <Text className="font-pmedium text-[30px]">Result</Text>
          </View>

          {/* Image */}
          <Image
            source={imageUri ? { uri: imageUri } : images.logo}
            resizeMode="cover"
            className="w-full h-[275px] mb-5 border bg-slate-400"
            borderRadius={10}
            onError={(e) =>
              console.error("Image load error:", e.nativeEvent.error)
            }
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
            handlePress={() =>
              router.push({
                pathname: "/treatment",
                params: {
                  imageUri: imageUri,
                  disease: disease || "Unknown Disease",
                  confidence: confidence,
                  date: date,
                  description: description,
                  treatments: treatments,
                  fromHistory: fromHistory, // Pass through the navigation source
                },
              })
            }
            containerStyles="w-full mt-6"
          />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Result;