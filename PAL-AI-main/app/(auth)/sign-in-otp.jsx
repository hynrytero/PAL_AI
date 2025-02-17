import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const SignInOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otpRefs = useRef([]);
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const API_URL = 'https://pal-ai-database-api-sea-87197497418.asia-southeast1.run.app';

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = async () => {
    if (!canResend) return;
    try {
      await axios.post(`${API_URL}/resend-password-otp`,
        {
          email: email,
        }
      );
      Alert.alert("Success", "Verification code resent successfully");
    } catch (error) {
      console.log("Error: ", error);
      Alert.alert("Error", error.response?.data?.message || "Resend failed");
    }

    setTimeLeft(60);
    setCanResend(false);

    setTimeout(() => {
      setCanResend(true);
    }, 60000);
  };

  const handleOtpChange = (index, value) => {
    if (value.match(/^[0-9]?$/)) {
      // Only allow single digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && index > 0 && otp[index] === "") {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerification = async () => {
    const verificationCode = otp.join("");
    if (verificationCode.length !== 6 || !email) {
        Alert.alert("Error", "Please enter the complete verification code");
        return;
    }

    setIsSubmitting(true);
    try {
        const response = await axios.post(`${API_URL}/verify-otp`, {
            email: email,
            otp: verificationCode
        });

        if (response.status === 200) {
            Alert.alert("Success", "OTP verified successfully", [
                {
                    text: "OK",
                    onPress: () => {
                        router.push({
                            pathname: "/change-password",
                            params: { email: email }
                        });
                    },
                },
            ]);
        }
    } catch (error) {
        Alert.alert(
            "Error",
            error.response?.data?.message ||
            "Verification failed. Please try again."
        );
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
          <TouchableOpacity onPress={() => router.push("/forgot-password")}>
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
          <Text className="text-center text-black font-semibold">{email}</Text>

          {/* OTP Input Fields */}
          <View className="flex-row justify-center gap-3 mt-5">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
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
          <TouchableOpacity
            className={`mt-3 ${!canResend ? "opacity-50" : ""}`}
            onPress={handleResend}
            disabled={!canResend}
          >
            <Text className="text-gray-500">
              {canResend ? (
                <>
                  Didn't receive the code?{" "}
                  <Text className="text-green-700 font-semibold">Resend</Text>
                </>
              ) : (
                <>
                  Waiting to resend code{" "}
                  <Text className="text-green-700 font-semibold">
                    ({timeLeft}s)
                  </Text>
                </>
              )}
            </Text>
          </TouchableOpacity>

          {/* Verify Button */}
          <CustomButton
            title={isSubmitting ? "Verifying..." : "Verify"}
            containerStyles="w-full mt-6"
            handlePress={handleVerification}
            disabled={isSubmitting}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignInOTP;
