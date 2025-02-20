import { Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../../context/AuthContext";

const ScreenLayout = () => {
  return (
    <AuthProvider>
    <>
      <Stack>
        <Stack.Screen
          name="camera"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="result"
          options={{
            title: "Result",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="treatment"
          options={{
            title: "Result",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="nearby"
          options={{
            title: "Store Nearby",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="editprofile"
          options={{
            title: "Edit Profile",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="manage"
          options={{
            title: "Manage",
            headerShown: false,
          }}
        />

      </Stack>

      <StatusBar style="dark" />
    </>
    </AuthProvider>
  );
};

export default ScreenLayout;
