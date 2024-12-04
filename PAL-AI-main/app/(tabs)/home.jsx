import { View, Text, ImageBackground, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/Card";
import CustomFAB from "../../components/CustomFloatingActionButton";
import { images, icons } from "../../constants";
import { Link, Redirect, router, Router } from "expo-router";

const Home = () => {
  
  const handleFABPress = () => {
    console.log("FAB with Camera Pressed!");
  };

  // para logout puhon
  const handleLogout = () => {
    logout();   
  };

  return (
    <SafeAreaView className="bg-[#ffffff] h-full">
      <ImageBackground
        source={images.backgroundmain}
        className="flex-1 h-[100%]"
        resizeMode="cover"
        imageStyle={{ opacity: 0.03 }}
      >
        <ScrollView>
          <View className="w-full min-h-[85vh] p-7">
            <View className="flex-col items-start">
              <Card />
              <Card />
              <Card />
            </View>
          </View>
        </ScrollView>
        <CustomFAB
          onPress={() => router.push("camera")}
          iconSource={icons.camera}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
