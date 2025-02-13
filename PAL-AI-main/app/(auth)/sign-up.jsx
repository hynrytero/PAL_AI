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
import { Link, router } from "expo-router";
import axios from "axios";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import CustomDropdown from "../../components/CustomDropDown";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";

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
  const dismissKeyboard = () => {Keyboard.dismiss();};

  // for form handlng
  const [error, setError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [ageError, setAgeError] = useState('');

  // Form Content Validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^09\d{9}$/;
    return mobileRegex.test(number);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateConfirmPassword = (confirmpassword) => {
    return confirmpassword !== form.password;
  };
  
  const validateAge = (age) => {
    const ageRegex = /^(100|[1-9]?[0-9])$/;
    return ageRegex.test(age);
  };

  // Form handlers
  const handleChangeEmail = (e) => {
    setForm({ ...form, email: e });
    if (!validateEmail(e)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  };

  const handleAge = (e) => {
    if (/^\d*$/.test(e)) {
      setForm({ ...form, age: e });
      if (!validateAge(e)) {
        setAgeError("Invalid age");
      } else {
        setAgeError("");  
      }
    }
  };

  const handleChangeMobile = (e) => {
    if (/^\d*$/.test(e) && e.length <= 11) {
      setForm({ ...form, mobilenumber: e });
      if (!validateMobileNumber(e)) {
        setMobileError("Invalid mobile number.");
      } else {
        setMobileError("");
      }
    }
  };

  const handleChangePassword = (e) => {
    setForm({ ...form, password: e });
    if (!validatePassword(e)) {
      setPasswordError("Password must be at least 8 characters long, contain 1 uppercase letter, 1 number, and 1 special character.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPassword = (e) => {
    setForm({ ...form, confirmpassword: e });
    if (validateConfirmPassword(e)) {
      setConfirmPasswordError("Password doesn't match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSignUp = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://pal-ai-database-api-sea-87197497418.asia-southeast1.run.app/pre-signup",
        {
          username: form.username,
          email: form.email,
          password: form.password,
          firstname: form.firstname,
          lastname: form.lastname,
          age: form.age,
          gender: selectedGender,
          mobilenumber: form.mobilenumber,
        }
      );
      router.push({
        pathname: "/sign-up-otp",
        params: { email: form.email }
      });

    } catch (error) {
      console.log('Error: ', error);
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
                onChangeText={handleAge}
                className="w-[48%]"
                mode="outlined"
                activeOutlineColor="#006400"
                outlineColor="#CBD2E0"
                textColor="#2D3648"
                error={!!ageError}
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
            {ageError && form.age.length > 0 && (<Text style={{ color: "red", marginTop: 5 }}>{ageError}</Text>)}

            <TextInput
              label="Email"
              value={form.email}
              onChangeText={handleChangeEmail}
              className="w-full mt-1"
              mode="outlined"
              activeOutlineColor="#006400"
              outlineColor="#CBD2E0"
              textColor="#2D3648"
              error={!!error}
            />
            {error && form.email.length > 0 && (<Text style={{ color: "red", marginTop: 5 }}>{error}</Text>)}
            
            <TextInput
              label="Mobile Number"
              value={form.mobilenumber}
              keyboardType="numeric"
              onChangeText={handleChangeMobile}
              className="w-full mt-1"
              mode="outlined"
              activeOutlineColor="#006400"
              outlineColor="#CBD2E0"
              textColor="#2D3648"
              error={!!mobileError}
            />
            {mobileError && form.mobilenumber.length > 0 && (<Text style={{ color: "red", marginTop: 5 }}>{mobileError}</Text>)}

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
            {passwordError && form.password.length > 0 && (<Text style={{ color: "red", marginTop: 5 }}>{passwordError}</Text>)}

            <TextInput
              label="Confirm Password"
              value={form.confirmpassword}
              onChangeText={handleConfirmPassword}
              secureTextEntry={!conPasswordVisible}
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
              error={!!confirmPasswordError}
            />
             {confirmPasswordError && form.confirmpassword.length > 0 && (<Text style={{ color: "red", marginTop: 5 }}>{confirmPasswordError}</Text>)}

             <CustomButton
              //Ichange lang dri if need muregister {handleSignup}, if deretso sa home kay () => router.push("/sign-up")
              title="Sign Up"
              handlePress={handleSignUp}
              containerStyles="w-full mt-6"
              isLoading={isSubmitting}
              disabled={
                !form.firstname ||
                !form.lastname ||
                !form.age ||
                !form.email ||
                !form.mobilenumber ||
                !form.username ||
                !form.password ||
                !form.confirmpassword ||
                !selectedGender ||
                !!error ||         
                !!mobileError ||     
                !!passwordError ||   
                !!confirmPasswordError || 
                !!ageError          
              }
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
