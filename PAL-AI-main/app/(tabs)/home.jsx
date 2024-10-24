import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <View>
      <SafeAreaView className="bg-[#ffffff] h-full">
        <Text>Home</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
          laudantium autem, ab eos ipsum numquam dolorum, hic impedit deserunt
          quos eaque quaerat. Magnam nulla dolor doloremque porro nam adipisci
          veritatis.
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default Home;
