import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Link, Redirect, router, Router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <ImageBackground
      source={images.background1}
      className="flex-1 w-full"
      imageStyle={{ opacity: 0.4 }}
    >
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-[85vh] px-7 pt-14">
          <Image
            source={images.logo}
            className="w-[200px] h-[200px]"
            resizeMode="contain"
          />
          <Text className="text-[35px] font-pmedium text-black mt-5 text-center">
            WELCOME TO <Text className="font-psemibold">PAL-AI</Text>
          </Text>

          <CustomButton
            title="GET STARTED"
            handlePress={() => router.push("/sign-up-otp")}
            containerStyles="w-full mt-3"
          />
          <Text className="mt-3 font-pmedium text-sm text-[#4B4B4B]">
            Have an account?{" "}
            <Link href="/sign-in" className="font-pbold text-secondary">
              Login
            </Link>
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
