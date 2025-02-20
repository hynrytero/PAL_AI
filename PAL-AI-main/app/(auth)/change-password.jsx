import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { TextInput } from "react-native-paper";
import axios from "axios";

const ChangePassword = () => {
  const router = useRouter();
  const { email = "" } = useLocalSearchParams();

  const [form, setForm] = useState({
    password: "",
    confirmpassword: ""
  });
  
  const API_URL = 'https://pal-ai-database-api-sea-87197497418.asia-southeast1.run.app';

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateConfirmPassword = (confirmpassword) => {
    return confirmpassword === form.password;
};

  const handleChangePassword = (e) => {
    setForm({ ...form, password: e });
    if (!validatePassword(e)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain 1 uppercase letter, 1 number, and 1 special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPassword = (e) => {
    setForm({ ...form, confirmpassword: e });
    if (!validateConfirmPassword(e)) {  
        setConfirmPasswordError("Password doesn't match.");
    } else {
        setConfirmPasswordError("");
    }
};

const handleSubmit = async () => {
  setApiError("");
  setIsSubmitting(true);

  try {  
      const response = await axios.post(`${API_URL}/reset-password`, { 
          email: email,
          newPassword: form.password
      }, {
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.data.message) {
          Alert.alert(
              "Success",
              "Password changed successfully",
              [
                  {
                      text: "OK",
                      onPress: () => router.push("/sign-in")
                  }
              ]
          );
      }
  } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMessage = "An error occurred while changing password";
      
      if (error.response) {
          switch (error.response.status) {
              case 400:
                  errorMessage = "Email and new password are required";
                  break;
              case 404:
                  errorMessage = "User not found";
                  break;
              case 500:
                  errorMessage = "Server error. Please try again later.";
                  console.error('Server Error Details:', error.response.data);
                  break;
              default:
                  errorMessage = error.response.data.error || errorMessage;
          }
      } else if (error.request) {
          errorMessage = "Unable to connect to server. Please check your internet connection.";
      }
      
      setApiError(errorMessage);
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

          {apiError ? (
            <Text className="text-red-500 mb-4 text-center">{apiError}</Text>
          ) : null}

          <TextInput
            label="New Password"
            value={form.password}
            onChangeText={handleChangePassword}
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
            error={!!passwordError}
          />
          {passwordError ? (
            <Text className="text-red-500 mt-1 text-sm">{passwordError}</Text>
          ) : null}

          <TextInput
            label="Confirm Password"
            value={form.confirmpassword}
            onChangeText={handleConfirmPassword}
            secureTextEntry={!confirmPasswordVisible}
            right={
              <TextInput.Icon
                icon={confirmPasswordVisible ? "eye-off" : "eye"}
                color="#006400"
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
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
            <Text className="text-red-500 mt-1 text-sm">{confirmPasswordError}</Text>
          ) : null}

          {/* Change Password Button */}
          <CustomButton
            title={isSubmitting ? "Changing..." : "Change"}
            containerStyles="w-full mt-6"
            handlePress={handleSubmit}
            disabled={isSubmitting || !!passwordError || !!confirmPasswordError}
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