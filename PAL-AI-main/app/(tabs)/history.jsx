import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Stack } from "expo-router"; // Make sure expo-router is installed and configured
import Icon from "react-native-vector-icons/MaterialIcons";
import Card from "../../components/Card";

import { images } from "../../constants";

const History = () => {
  return (
    <ImageBackground
      source={images.background_history}
      className="flex-1 h-full w-full bg-white"
    >
      <ScrollView className="mt-12">
        <SafeAreaView className="px-7 w-full h-full mb-10">
          <View className="flex-row items-center w-full mb-3">
            <Text className="font-pmedium text-[30px]">History</Text>
          </View>
          <Card
            disease={"Rice Tungro"}
            desc={"There's a high possibility that this rice plant has tungro."}
            date={"December 3, 2024"}
            percent={"93"}
            color="bg-[#ADD8E6]"
            image={images.tungro}
          />
          <Card
            disease={"Rice Leaf Blight"}
            desc={
              "There's a high possibility that this rice plant has leaf blight."
            }
            date={"December 1, 2024"}
            percent={"93"}
            color="bg-[#8FBC8F]"
            image={images.blight}
          />
          <Card
            disease={"Rice Blast"}
            desc={"There's a high possibility that this rice plant has blast."}
            date={"November 28, 2024"}
            percent={"99"}
            color="bg-[#FFE452]"
            image={images.blast}
          />
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

export default History;
