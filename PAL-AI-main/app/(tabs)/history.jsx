import React from "react";
import { View, Text } from "react-native";
import { Stack } from "expo-router"; // Make sure expo-router is installed and configured

const History = () => {
  return (
    <View>
      {/* Stack is used here */}
      <Stack>
        {/* Define the screen here */}
        <Stack.Screen
          name="(screen)/result" // This should be the path to the result screen relative to your file structure
          options={{
            headerShown: false, // Disable header if not needed
          }}
        />
      </Stack>
      {/* You can add other content below, such as the history list */}
      <Text>History Screen Content</Text>
    </View>
  );
};

export default History;
