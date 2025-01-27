import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Link,
  Redirect,
  router,
  Router,
  useLocalSearchParams,
} from "expo-router";
import React from "react";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";

const Result = () => {
  // Get the params passed from the previous screen
  const params = useLocalSearchParams();
  console.log("Received params:", params);
  console.log("Image URI type:", typeof imageUri);
  console.log("Image URI value:", imageUri);
  console.log("FULL PARAMS:", JSON.stringify(params, null, 2));

  const {
    imageUri = null,
    disease = "Unknown Disease",
    confidence = "0%",
    date = new Date().toLocaleDateString(),
    description = "No description available",
    treatments = "No description available",
  } = params;

  console.log("EXTRACTED imageUri:", imageUri);
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
              onPress={() => router.back()}
            />
            <Text className="font-pmedium text-[30px]">Result</Text>
          </View>

          {/* Image */}
          <Image
            source={images.logo} // Replace with your fallback image path
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
                  date: new Date().toLocaleDateString(),
                  description: description,
                  treatments: treatments || "No treatments available",
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
