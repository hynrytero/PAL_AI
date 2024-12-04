import { View, Text, ScrollView, Image, ImageBackground, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import axios from 'axios';

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import CustomDropdown from "../../components/CustomDropDown";

const SignUp = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    mobilenumber: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);

  const handleSignUp = async () => {
    // Basic validation
    if (form.password !== form.confirmpassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://192.168.1.2:5000/signup', {
        username: form.username,
        email: form.email,
        password: form.password,
        firstname: form.firstname,
        lastname: form.lastname,
        age: form.age,
        gender: selectedGender,
        mobilenumber: form.mobilenumber
      });

      Alert.alert("Success", "Account created successfully");
      router.push("/sign-in");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ImageBackground
        source={images.backgroundmain}
        className="flex-1"
        resizeMode="cover"
        imageStyle={{ opacity: 0.1 }}
      >
        <ScrollView>
          <View className="w-full justify-center h-full p-7">
            <View className="flex-row items-center">
              <Image
                source={images.logo}
                resizeMode="contain"
                className="w-[75px] h-[70px] mr-3"
              />
              <Text className="font-pregular text-3xl">PAL-AI</Text>
            </View>
            <Text className="font-psemibold text-4xl mt-6">Sign-up</Text>
            <Text className="text-lg">Please enter your details</Text>
            <View className="flex-row w-full justify-between">
              <FormField
                title="First Name"
                value={form.firstname}
                handleChangeText={(e) => setForm({ ...form, firstname: e })}
                otherStyles="mt-7 w-[48%]"
                keyboardType="default"
              />
              <FormField
                title="Last Name"
                value={form.lastname}
                handleChangeText={(e) => setForm({ ...form, lastname: e })}
                otherStyles="mt-7 w-[48%]"
                keyboardType="default"
              />
            </View>
            <View className="flex-row w-full justify-between">
              <FormField
                title="Age"
                value={form.age}
                handleChangeText={(e) => setForm({ ...form, age: e })}
                otherStyles="mt-7 w-[48%]"
                keyboardType="numeric"
              />
              <CustomDropdown
                title="Select Gender"
                value={selectedGender}
                placeholder="Select Gender"
                data={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Prefer not to say", value: "Prefer not to say" },
                ]}
                handleChange={(value) => setSelectedGender(value)}
                otherStyles="mt-6 w-[48%]"
              />
            </View>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-2"
              keyboardType="email-address"
            />
            <FormField
              title="Mobile Number"
              value={form.mobilenumber}
              handleChangeText={(e) => setForm({ ...form, mobilenumber: e })}
              otherStyles="mt-2"
              keyboardType="numeric"
            />
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-2"
              keyboardType="default"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-2"
              keyboardType="password"
              secureTextEntry
            />
            <FormField
              title="Confirm Password"
              value={form.confirmpassword}
              handleChangeText={(e) => setForm({ ...form, confirmpassword: e })}
              otherStyles="mt-2"
              keyboardType="password"
              secureTextEntry
            />
            <CustomButton
              title="Sign Up"
              handlePress={handleSignUp}
              containerStyles="w-full mt-7"
              isLoading={isSubmitting}
            />
            <View className="items-center flex-1">
              <Text className="mt-2 font-pregular text-sm text-[#4B4B4B]">
                Already a user?{" "}
                <Link href="/sign-in" className="font-psemibold text-secondary">
                  Log in
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;