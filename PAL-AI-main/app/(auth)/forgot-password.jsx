import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { TextInput } from "react-native-paper";

const SignUpOTP = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const API_URL = 'https://pal-ai-database-api-sea-87197497418.asia-southeast1.run.app';

  // State variables
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChangeEmail = (e) => {
    setEmail(e);
    if (!validateEmail(e)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  };

  const handleVerification = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/forgot-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email 
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Success - email was found and OTP sent
        router.push({
            pathname: "/sign-in-otp",
            params: { email: email },
        });

      } else {
        // Handle error - email not found or server error
        setError(data.message);
      }
    } catch (err) {
      // Handle network or other errors
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            onChangeText={handleChangeEmail}
            activeOutlineColor="#006400"
            outlineColor="#CBD2E0"
            textColor="#2D3648"
            value={email}
            error={!!error}
          />
          {error && <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>}

          {/* Send OTP Button */}
          <CustomButton
            title={isSubmitting ? "Sending..." : "Send OTP"}
            containerStyles="w-full mt-6"
            handlePress={handleVerification}
            disabled={isSubmitting || email.trim() === "" || !validateEmail(email)}
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
