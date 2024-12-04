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


  const handleLogin = async () => {
    // Validate input
    if (!form.username || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

     try {
       // Make login request to your backend
       const response = await axios.post('http://192.168.1.2:5000/login', {
         username: form.username,
         password: form.password
       });
       console.log('Response data:', response.data);
       // Handle successful login
       if (response.data.user) {
        console.log('Username:' + response.data.user.username);
        console.log('userId:' + response.data.user.id);
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
     <SafeAreaView className="h-full">
       <ImageBackground
         source={images.backgroundmain}
         className="flex-1 h-[100%]"
         resizeMode="cover"
         imageStyle={{ opacity: 0.03 }}
       >
         <ScrollView>
           <View className="w-full justify-center min-h-[85vh] p-7">
             <View className="flex-row items-center">
               <Image
                 source={images.logo}
                 resizeMode="contain"
                 className="w-[75px] h-[70px] mr-3"
               />
               <Text className="font-pregular text-3xl">PAL-AI</Text>
             </View>
             <Text className="font-psemibold text-4xl mt-6">Log in</Text>
             <Text className="text-lg text-gray-500">
               Welcome! Please enter your details.
             </Text>
             <FormField
               title="Username"
               value={form.username}
               handleChangeText={(e) => setForm({ ...form, username: e })}
               otherStyles="mt-7"
               keyboardType="default"
             />
             <FormField
               title="Password"
               value={form.password}
               handleChangeText={(e) => setForm({ ...form, password: e })}
               otherStyles="mt-5"
               keyboardType="password"
               secureTextEntry={true}
             />
             <CustomButton
               title="Log in"
               handlePress={handleLogin}
               containerStyles="w-full mt-5"
               isLoading={isSubmitting}
             />
             <View className="items-center flex-1">
               <Text className="mt-3 font-pregular text-sm text-[#4B4B4B]">
                 Need an account?{" "}
                 <Link href="/sign-up" className="font-psemibold text-secondary">
                   Sign up
                 </Link>
               </Text>
             </View>
           </View>
         </ScrollView>
       </ImageBackground>
     </SafeAreaView>
   );
};

export default SignIn;
