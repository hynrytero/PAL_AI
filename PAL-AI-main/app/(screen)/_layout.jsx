import { Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ScreenLayout = () => {
  return (
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
      </Stack>

      <StatusBar style="dark" />
    </>
  );
};

export default ScreenLayout;
