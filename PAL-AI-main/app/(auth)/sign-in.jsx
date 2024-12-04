import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import axios from "axios";
import { TextInput } from "react-native-paper";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook

const SignIn = () => {
  const { login } = useAuth(); // Use the login function from AuthContext
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    // Validate input
    if (!form.username || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Make login request to your backend
      const response = await axios.post("http://192.168.1.38:5000/login", {
        username: form.username,
        password: form.password,
      });
      console.log("Response data:", response.data);
      // Handle successful login
      if (response.data.user) {
        console.log("Username:" + response.data.user.username);
        console.log("userId:" + response.data.user.id);
        // Use the login function from AuthContext to store user info
        await login(response.data.user.id, response.data.user.username);

        Alert.alert("Success", "Login Successful");
        // Navigate to home screen
        router.push("home");
      }
    } catch (error) {
      // Handle login errors
      const errorMsg = error.response?.data?.message || "Login failed";
      Alert.alert("Error", errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={images.background_signin}
      className="flex-1 h-full"
      resizeMode="cover"
    >
      <View className="flex-1 h-full justify-center">
        <View className="w-full justify-center p-7">
          <View className="flex-row items-center">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[100px] h-[100px] mr-3"
            />
            <Text className="font-psemibold text-3xl">PAL-AI</Text>
          </View>
          <Text className="font-psemibold text-3xl mt-6">Log in</Text>
          <Text className="text-lg">Welcome! Please enter your details.</Text>
          <TextInput
            label="Username"
            value={form.username}
            onChangeText={(e) => setForm({ ...form, username: e })}
            className="w-full mt-3"
            mode="outlined"
            activeOutlineColor="#006400"
            outlineColor="#CBD2E0"
            textColor="#2D3648"
          />
          <TextInput
            label="Password"
            secureTextEntry={!passwordVisible}
            right={
              <TextInput.Icon
                icon={passwordVisible ? "eye-off" : "eye"}
                color="#006400"
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
            className="w-full mt-1"
            mode="outlined"
            activeOutlineColor="#006400"
            outlineColor="#CBD2E0"
            textColor="#2D3648"
          />
          <CustomButton
            title="Log in"
            handlePress={handleLogin}
            containerStyles="w-full mt-5"
            isLoading={isSubmitting}
          />
          <View className="items-center">
            <Text className="mt-3 font-pregular text-sm text-[#4B4B4B]">
              Need an account?{" "}
              <Link href="/sign-up" className="font-psemibold text-secondary">
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </View>
      <View className="items-center justify-center">
        <Text className="my-2 font-pregular text-[12px] text-[#4B4B4B] text-center">
          By joining, you accept the{" "}
          <Text className="text-secondary">Privacy Policy</Text> and{" "}
          <Text className="text-secondary">Terms of Use</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SignIn;
