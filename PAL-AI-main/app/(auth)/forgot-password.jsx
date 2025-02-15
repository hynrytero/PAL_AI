import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { TextInput } from "react-native-paper";

const SignUpOTP = () => {
  const router = useRouter();
  const { email = "" } = useLocalSearchParams(); // Default to empty string if email is missing

  // State variables
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerification = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/sign-in-otp"); // Navigate to OTP verification page
    }, 2000); // Simulated delay
  };

  return (
    <ImageBackground
      source={images.background_signup}
      className="flex-1 h-full"
      resizeMode="cover"
    >
      <View className="flex-1 items-center px-6 h-full w-full">
        {/* Header */}
        <View className="flex-row w-full items-center justify-start mt-[100px] mb-[100px]">
          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <Icon name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold flex-1 text-center">
            Forgot Password
          </Text>
        </View>

        {/* Content */}
        <View className="w-full h-full items-center pt-20">
          <View className="flex-column items-center my-5 gap-2">
            <Text className="font-psemibold text-3xl">Forgot Password?</Text>
            <Text className="text-center text-gray-500">
              Enter your email to reset your password
            </Text>
          </View>

          {/* Display Email */}
          {email ? (
            <Text className="text-center text-black font-semibold">
              {email}
            </Text>
          ) : null}

          {/* Email Input */}
          <TextInput
            label="Email"
            mode="outlined"
            style={{ width: "100%", marginTop: 10 }}
            activeOutlineColor="#006400"
            outlineColor="#CBD2E0"
            textColor="#2D3648"
          />

          {/* Send OTP Button */}
          <CustomButton
            title={isSubmitting ? "Sending..." : "Send OTP"}
            containerStyles="w-full mt-6"
            handlePress={handleVerification}
            disabled={isSubmitting}
          />

          {/* Back to Log-In */}
          <View className="items-center mt-5">
            <Link href="/sign-in" className="font-pmedium text-black">
              Back to Log-In
            </Link>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignUpOTP;
