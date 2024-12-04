import { Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from '../../context/AuthContext';

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
            name="sign-in"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar backgroundColor="#228B22" style="light" />
      </>
    </AuthProvider>
  );
};

export default AuthenticationLayout;
