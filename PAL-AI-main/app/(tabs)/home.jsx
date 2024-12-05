import { View, Text, ImageBackground, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/Card";
import WeatherCard from "../../components/SmallCard";
import CustomFAB from "../../components/CustomFloatingActionButton";
import { images, icons } from "../../constants";
import { Link, Redirect, router, Router } from "expo-router";

const Home = () => {
  const handleFABPress = () => {
    console.log("FAB with Camera Pressed!");
  };

  return (
    <ImageBackground
      source={images.backgroundmain}
      className="flex-1 h-full"
      resizeMode="cover"
      imageStyle={{ opacity: 0.03 }}
    >
      <ScrollView className="mb-[50px]">
        <ImageBackground
          source={images.backgroundweather}
          className="h-auto bg-[#C4E2FF] rounded-b-[30px] overflow-hidden"
          resizeMode="cover"
        >
          <View className="w-full h-auto px-7 pt-12 pb-4 rounded-b-[30px] flex-col items-center">
            <View className="flex-row items-start justify-between w-full my-5">
              <View className="flex-row w-auto items-bottom">
                <Image
                  source={icons.pin}
                  className="h-[25px] w-[25px] mr-3"
                  resizeMode="contain"
                />
                <Text className="font-psemibold text-[20px] text-[#24609B]">
                  Cambinocot
                </Text>
              </View>
              <Text className="text-[#24609B]">Today 9:41 AM</Text>
            </View>
            <Image
              source={images.sun}
              className="h-[150px] w-[150px]"
              resizeMode="contain"
            />
            <Text className="font-pmedium text-[50px] text-[#24609B]">27°</Text>
            <Text className="text-lg text-[#24609B]">Mostly Clear</Text>
            <View className="flex-row mx-7 mt-5 bg-[#D3E9FF]  w-full rounded-[5px] p-[5px] justify-between items-center">
              <View className="flex-row w-auto items-bottom">
                <Image
                  source={icons.eye1}
                  className="h-[25px] w-[25px] mr-3"
                  resizeMode="contain"
                />
                <Text className="text-lg text-[#24609B]">30%</Text>
              </View>
              <View className="flex-row w-auto items-bottom">
                <Image
                  source={icons.drop}
                  className="h-[25px] w-[25px] mr-3"
                  resizeMode="contain"
                />
                <Text className="text-lg text-[#24609B]">30%</Text>
              </View>
              <View className="flex-row w-auto items-bottom">
                <Image
                  source={icons.wind}
                  className="h-[25px] w-[25px] mr-3"
                  resizeMode="contain"
                />
                <Text className="text-lg text-[#24609B]">30%</Text>
              </View>
            </View>
            <View className="flex-row mx-7 mt-5 bg-[#D3E9FF]  w-full rounded-[5px] p-[10px] justify-between items-center">
              <View className="bg-[#5284B7] w-[100px] rounded-[5px] justify-center items-center p-3 overflow-hidden">
                <Image
                  source={images.circlesun}
                  className="absolute bottom-[-50] right-[-30]"
                />
                <Text className="text-white font-pmedium text-md">Today</Text>
                <Text className="font-pregular text-[40px] text-white">
                  29°
                </Text>
              </View>
              <View className="bg-[#7BAFE3] w-[100px] rounded-[5px] justify-center items-center p-3 overflow-hidden">
                <Image
                  source={images.circlesun}
                  className="absolute bottom-[-50] right-[-30]"
                />
                <Text className="text-white font-pmedium text-md">
                  Tomorrow
                </Text>
                <Text className="font-pregular text-[40px] text-white">
                  28°
                </Text>
              </View>
              <View className="bg-[#7BAFE3] w-[100px] rounded-[5px] justify-center items-center p-3 overflow-hidden">
                <Image
                  source={images.circlesun}
                  className="absolute bottom-[-50] right-[-30]"
                />
                <Text className="text-white font-pmedium text-md">Sunday</Text>
                <Text className="font-pregular text-[40px] text-white">
                  30°
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View className="w-full h-auto pl-7">
          <View className="flex-row justify-between w-full py-3 pr-7">
            <Text className="font-psemibold">Today</Text>
            <Text className="font-pmedium">December 6, 2024</Text>
          </View>
          <View className="flex-row">
            <WeatherCard
              time="07 AM"
              image={images.clearsun}
              degrees={24}
              bgcolor="#7BAFE3"
            />
            <WeatherCard
              time="08 AM"
              image={images.clearsun}
              degrees={25}
              bgcolor="#7BAFE3"
            />
            <WeatherCard
              time="09 AM"
              image={images.clearsun}
              degrees={27}
              bgcolor="#5284B7"
            />
            <WeatherCard
              time="10 AM"
              image={images.cloudy}
              degrees={27}
              bgcolor="#7BAFE3"
            />
            <WeatherCard
              time="11 AM"
              image={images.clearsun}
              degrees={30}
              bgcolor="#7BAFE3"
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;
