import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Link, Redirect, router, Router } from "expo-router";

import React from "react";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";

const nearby = () => {
  return (
    <View className="flex-1 h-full w-full">
      <SafeAreaView className="w-full h-full">
        <ImageBackground
          source={images.map}
          resizeMode="cover"
          className="h-full"
        >
          <View className="justify-between h-full">
            <View className="flex-row items-center w-full mb-7 bg-white px-7 pt-3 pb-2">
              <Icon name="chevron-left" size={40} color="black" />
              <Text className="font-pmedium text-[30px]">Store Nearby</Text>
            </View>

            <View className="mx-7">
              <CustomButton
                title="Start Navigation"
                //Ichange lang dri if need muregister {handleSignup}, if deretso sa home kay () => router.push("/sign-up")
                //handlePress={() => router.push("nearby")}
                containerStyles="w-full mb-7"
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

export default nearby;
