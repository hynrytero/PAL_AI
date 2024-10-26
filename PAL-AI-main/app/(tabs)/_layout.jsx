import { View, Text, Image } from "react-native";
import { Tabs, Redirect, Stack } from "expo-router";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="camera"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default TabsLayout;
