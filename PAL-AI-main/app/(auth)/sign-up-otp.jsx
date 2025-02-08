import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";

const SignUpOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]); // Create refs for each input

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input field if not the last one
      if (value && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && index > 0 && !otp[index]) {
      otpRefs.current[index - 1].focus(); // Move to the previous input on backspace
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
          <TouchableOpacity>
            <Icon name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold flex-1 text-center">
            Verify Account
          </Text>
        </View>
        <View className="w-full items-center justify-center">
          {/* Image */}
          <Image
            source={images.logo}
            className="w-36 h-36 mt-6"
            resizeMode="contain"
          />

          {/* OTP Message */}
          <Text className="text-center text-gray-500 mt-4">
            We've sent an OTP to your email account
          </Text>
          <Text className="text-center text-black font-semibold">
            joemarygot@gmail.com
          </Text>

          {/* OTP Input Fields */}
          <View className="flex-row justify-center gap-3 mt-5">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (otpRefs.current[index] = el)} // Assign refs
                value={digit}
                onChangeText={(value) => handleOtpChange(index, value)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(index, nativeEvent.key)
                }
                keyboardType="numeric"
                maxLength={1}
                className="border border-gray-300 w-12 h-12 text-center text-lg rounded-lg"
              />
            ))}
          </View>

          {/* Resend OTP */}
          <TouchableOpacity className="mt-3">
            <Text className="text-gray-500">
              Didn’t receive the code?{" "}
              <Text className="text-green-700 font-semibold">Resend</Text>
            </Text>
          </TouchableOpacity>

          {/* Verify Button */}
          <CustomButton title="Verify" containerStyles="w-full mt-6" />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignUpOTP;
