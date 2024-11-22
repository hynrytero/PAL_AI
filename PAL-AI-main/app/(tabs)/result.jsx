import { View, Text, ImageBackground, ScrollView, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import CustomButtonOutline from "../../components/CustomButtonOutline";

import { images } from "../../constants";

const result = () => {
  //const [isSubmitting, setisSubmitting] = useState(false);
  return (
    <SafeAreaView className="h-full">
      <ImageBackground
        source={images.backgroundmain}
        className="flex-1"
        resizeMode="cover"
        imageStyle={{ opacity: 0.1 }}
      >
        <ScrollView>
          <View className="flex-column items-center p-7">
            <Text className="font-pmedium text-3xl mb-5">Results</Text>
            <Image
              source={images.background1}
              resizeMode="cover"
              className="w-full h-[350] mb-5"
              borderRadius={20}
            ></Image>
            <Text className="font-pmedium text-2xl mb-1">Tungro Virus</Text>
            <Text className="font-psemibold text-3xl">97%</Text>
            <Text className="text-red-700 font-psemibold text-4xl">
              WARNING!
            </Text>
            <Text className="font-pmedium text-2xl mb-1">
              Tungro Virus detected!
            </Text>
            <CustomButton
              title="Check Health"
              //handlePress={() => router.push("result")}
              containerStyles="w-full mt-5"
              //isLoading={isSubmitting}
            />
            <CustomButtonOutline
              title="Treatments"
              //handlePress={() => router.push("result")}
              containerStyles="w-full mt-5"
              //isLoading={isSubmitting}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default result;
