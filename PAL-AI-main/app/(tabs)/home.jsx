import { View, Text, ImageBackground, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/Card";

import { images } from "../../constants";

const Home = () => {
  return (
    <View>
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
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

export default Home;
