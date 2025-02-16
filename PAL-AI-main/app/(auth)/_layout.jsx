import { Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../../context/AuthContext";

const AuthenticationLayout = () => {
  return (
    <AuthProvider>
      <>
        <Stack>
          <Stack.Screen
            name="sign-up"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sign-up-otp"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sign-in"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="terms-and-condition"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="forgot-password"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sign-in-otp"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="change-password"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="light" />
      </>
    </AuthProvider>
  );
};

export default AuthenticationLayout;
