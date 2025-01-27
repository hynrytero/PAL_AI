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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import axios from "axios";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";

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

  const data = [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
    { label: "Prefer not to say", value: "3" },
  ];

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [conPasswordVisible, setConPasswordVisible] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const togglePasswordVisibility = () => setSecureText(!secureText);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSignUp = async () => {
    // Basic validation
    if (
      !form.firstname ||
      !form.lastname ||
      !form.age ||
      !form.email ||
      !form.mobilenumber ||
      !form.username ||
      !form.password ||
      !form.confirmpassword
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (form.password !== form.confirmpassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Additional validation for specific fields
    if (!selectedGender) {
      Alert.alert("Error", "Please select a gender");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://192.168.1.2:5000/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
        firstname: form.firstname,
        lastname: form.lastname,
        age: form.age,
        gender: selectedGender,
        mobilenumber: form.mobilenumber,
      });

      Alert.alert("Success", "Account created successfully");
      router.push("/sign-in");
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground
        source={images.background_signup}
        className="flex-1 h-full"
        resizeMode="cover"
      >
        <View className="flex-1 h-full justify-center">
          <View className="w-full justify-center px-7">
            <View className="flex-row items-center">
              <Image
                source={images.logo}
                resizeMode="contain"
                className="w-[100px] h-[100px] mr-3"
              />
              <Text className="font-psemibold text-3xl">PAL-AI</Text>
            </View>
            <Text className="font-psemibold text-3xl mt-6">Sign-Up</Text>
            <Text className="text-lg">Please enter the details.</Text>
            <View className="flex-row w-full justify-between mt-3">
              <TextInput
                label="First Name"
                value={form.firstname}
                onChangeText={(e) => setForm({ ...form, firstname: e })}
                className="w-[48%]"
                mode="outlined"
                activeOutlineColor="#006400"
                outlineColor="#CBD2E0"
                textColor="#2D3648"
              />
              <TextInput
                label="Last Name"
                value={form.lastname}
                onChangeText={(e) => setForm({ ...form, lastname: e })}
                className="w-[48%]"
                mode="outlined"
                activeOutlineColor="#006400"
                outlineColor="#CBD2E0"
                textColor="#2D3648"
              />
            </View>
            <View className="flex-row w-full justify-between mt-1">
              <TextInput
                label="Age"
                value={form.age}
                keyboardType="numeric"
                onChangeText={(e) => setForm({ ...form, age: e })}
                className="w-[48%]"
                mode="outlined"
                activeOutlineColor="#006400"
                outlineColor="#CBD2E0"
                textColor="#2D3648"
              />
              <View className="w-[48%] bg-white border border-[#CBD2E0] rounded-[5px] p-2 mt-[6px]">
                <Dropdown
                  className="mx-[5px] align-middle my-[6px]"
                  placeholderStyle="text-base"
                  selectedTextStyle="text-base"
                  inputSearchStyle="text-base"
                  iconStyle="mr-2"
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder="Gender"
                  value={selectedGender}
                  onChange={(item) => {
                    setSelectedGender(item.value);
                    setValue(item.value);
                  }}
                />
              </View>
            </View>
            <TextInput
              label="Email"
              value={form.email}
              onChangeText={(e) => setForm({ ...form, email: e })}
              className="w-full mt-1"
              mode="outlined"
              activeOutlineColor="#006400"
              outlineColor="#CBD2E0"
              textColor="#2D3648"
            />
            <TextInput
              label="Mobile Number"
              value={form.mobilenumber}
              keyboardType="numeric"
              onChangeText={(e) => setForm({ ...form, mobilenumber: e })}
              className="w-full mt-1"
              mode="outlined"
              activeOutlineColor="#006400"
              outlineColor="#CBD2E0"
              textColor="#2D3648"
            />
            <TextInput
              label="Username"
              value={form.username}
              onChangeText={(e) => setForm({ ...form, username: e })}
              className="w-full mt-1"
              mode="outlined"
              activeOutlineColor="#006400"
              outlineColor="#CBD2E0"
              textColor="#2D3648"
            />
            <TextInput
              label="Password"
              value={form.password}
              onChangeText={(e) => setForm({ ...form, password: e })}
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
              value={form.confirmpassword}
              onChangeText={(e) => setForm({ ...form, confirmpassword: e })}
              right={
                <TextInput.Icon
                  icon={conPasswordVisible ? "eye-off" : "eye"}
                  color="#006400"
                  onPress={() => setConPasswordVisible(!conPasswordVisible)}
                />
              }
              className="w-full mt-1"
              mode="outlined"
              activeOutlineColor="#006400"
              outlineColor="#CBD2E0"
              textColor="#2D3648"
            />
            <CustomButton
              title="Sign Up"
              //Ichange lang dri if need muregister {handleSignup}, if deretso sa home kay () => router.push("/sign-up")
              handlePress={handleSignUp}
              containerStyles="w-full mt-6"
              isLoading={isSubmitting}
            />
            <View className="items-center">
              <Text className="mt-3 font-pregular text-sm text-[#4B4B4B]">
                Already a user?{" "}
                <Link href="/sign-in" className="font-psemibold text-secondary">
                  Log in
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
export default SignUp;
