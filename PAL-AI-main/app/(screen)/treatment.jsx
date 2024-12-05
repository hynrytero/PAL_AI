import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Link, Redirect, router, Router } from "expo-router";

import React from "react";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";

const treatment = () => {
  return (
    <ImageBackground
      source={images.background_treatment}
      className="flex-1 h-full w-full bg-white"
    >
      <View className="flex-1 h-full w-full pt-7">
        <SafeAreaView className="w-full h-full">
          <ScrollView className="px-7">
            <View className="flex-row items-center w-full mb-7">
              <Icon name="chevron-left" size={40} color="black" />
              <Text className="font-pmedium text-[30px]">Treatments</Text>
            </View>
            <Image
              source={images.background1}
              resizeMode="cover"
              className="w-full h-[275px] mb-5"
              borderRadius={10}
            />
            <View className="justify-center items-center">
              <Text className="font-pmedium text-[25px] text-center">
                Insecticide: Buprofezin-based products
              </Text>
            </View>
            <Text className="font-pregular text-md leading-6 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
              iste eum tempore optio, dicta illo quas sequi quibusdam aperiam?
              Consectetur laboriosam ipsum hic odio aliquid ullam ducimus
              consequatur ab debitis?
            </Text>
            <Text className="font-psemibold text-md mb-5">Instructions</Text>
            <Text className="font-pregular text-md leading-6 mb-5">
              1. Inspect the field for symptoms such as stunted growth, yellow
              or orange discoloration, and reduced tillers. {"\n"}2. Apply
              Buprofezin-based insecticide when the green leafhopper population
              exceeds the threshold level (one adult leafhopper per hill).{" "}
              {"\n"} 3. Use the recommended dosage specified on the product
              label. Typically, 200-300 ml per hectare mixed with sufficient
              water. {"\n"}4. Spray in the early morning or late afternoon for
              effective absorption and to avoid evaporation. Avoid applying the
              treatment during rain or strong winds.
            </Text>
            <CustomButton
              title="Store Nearby"
              //Ichange lang dri if need muregister {handleSignup}, if deretso sa home kay () => router.push("/sign-up")
              handlePress={() => router.push("nearby")}
              containerStyles="w-full my-6"
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default treatment;
