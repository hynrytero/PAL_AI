import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { TextInput } from "react-native-paper";

const ChangePassword = () => {
  const router = useRouter();
  const { email = "" } = useLocalSearchParams(); // Default to empty string if email is missing

  // State variables
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleVerification = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(); // Navigate to OTP verification page
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
            Change Password
          </Text>
        </View>

        {/* Content */}
        <View className="w-full h-full items-center pt-20">
          <View className="flex-column items-center my-5 gap-2">
            <Text className="font-psemibold text-3xl">Change Password</Text>
            <Text className="text-center text-gray-500">
              Enter a new password to update it
            </Text>
          </View>

          <TextInput
            label="New Password"
            value={password}
            onChangeText={setPassword}
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

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError(""); // Reset error when typing
            }}
            secureTextEntry={!confirmPasswordVisible}
            right={
              <TextInput.Icon
                icon={confirmPasswordVisible ? "eye-off" : "eye"}
                color="#006400"
                onPress={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              />
            }
            className="w-full mt-1"
            mode="outlined"
            activeOutlineColor="#006400"
            outlineColor="#CBD2E0"
            textColor="#2D3648"
            error={!!confirmPasswordError}
          />
          {confirmPasswordError ? (
            <Text className="text-red-500 mt-1">{confirmPasswordError}</Text>
          ) : null}

          {/* Change Password Button */}
          <CustomButton
            title={isSubmitting ? "Changing..." : "Change"}
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

export default ChangePassword;
