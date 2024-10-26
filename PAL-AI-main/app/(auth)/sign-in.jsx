import { View, Text, ScrollView, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect, router, Router } from "expo-router";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);
  return (
    <SafeAreaView className="h-full">
      <ImageBackground
        source={images.backgroundmain}
        className="flex-1 h-[100%]"
        resizeMode="cover"
        imageStyle={{ opacity: 0.03 }}
      >
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] p-7">
            <View className="flex-row items-center">
              <Image
                source={images.logo}
                resizeMode="contain"
                className="w-[75px] h-[70px] mr-3"
              />
              <Text className="font-pregular text-3xl">PAL-AI</Text>
            </View>
            <Text className="font-psemibold text-4xl mt-6">Log in</Text>
            <Text className="text-lg text-gray-500">
              Welcome! Please enter your details.
            </Text>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-7"
              keyboardType="default"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-5"
              keyboardType="password"
            />
            <CustomButton
              title="Log in"
              handlePress={() => router.push("camera")}
              containerStyles="w-full mt-5"
              isLoading={isSubmitting}
            />
            <View className="items-center flex-1">
              <Text className="mt-3 font-pregular text-sm text-[#4B4B4B]">
                Need an account?{" "}
                <Link href="/sign-up" className="font-psemibold text-secondary">
                  Sign up
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;
