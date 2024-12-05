import { View, Text, Image, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Link, Redirect, router, Router } from "expo-router";

import React from "react";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";

const result = () => {
  return (
    <ImageBackground
      source={images.background_result}
      className="flex-1 h-full w-full bg-white"
    >
      <View className="flex-1 h-full w-full">
        <SafeAreaView className="p-7 w-full h-full">
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
  );
};

export default result;
