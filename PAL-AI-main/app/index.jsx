import { ScrollView, Text, View, Image, ImageBackground } from "react-native";
import { Link, Redirect, router, Router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className="bg-[#ffffff] h-full">
      <ImageBackground
        source={images.background1}
        className="flex-1 w-full"
        imageStyle={{ opacity: 0.2 }}
      >
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center h-[85vh] px-7">
            <Image
              source={images.logo}
              className="w-[200px] h-[200px]"
              resizeMode="contain"
            />
            <Text className="text-[35px] font-pmedium text-[#4B4B4B] mt-5 text-center">
              WELCOME TO <Text className="font-psemibold">PAL-AI</Text>
            </Text>

            <CustomButton
              title="GET STARTED"
              handlePress={() => router.push("/sign-up")}
              containerStyles="w-full mt-3"
            />
            <Text className="mt-3 font-pregular text-sm text-[#4B4B4B]">
              Have an account?{" "}
              <Link href="/sign-in" className="font-pbold text-secondary">
                Login
              </Link>
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
      <StatusBar backgroundColor="#228B22" style="light" />
    </SafeAreaView>
  );
}
