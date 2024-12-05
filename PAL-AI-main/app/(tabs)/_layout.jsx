import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router, Router, Tabs } from "expo-router";
import { AuthProvider } from "../../context/AuthContext";
import { icons } from "../../constants";
import { Icon } from "react-native-paper";
import CustomFAB from "../../components/CustomFloatingActionButton";

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
    <AuthProvider>
    <>
      {/* This code is for bottom navigation bar */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2C9C4B",
          tabBarInactiveTintColor: "#000064",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 2,
            borderTopColor: "#C8C8C8",
            height: 84,
            justifyContent: "space-between", // Ensure tabs are evenly spaced
          },
        }}
      >
        {/* This tab is for home screen (weather) */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        {/* This tab is for the history of the disease captured */}
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.clock}
                color={color}
                name="History"
                focused={focused}
              />
            ),
          }}
        />
        {/* Dummy tab for spacing */}
        <Tabs.Screen
          name="empty"
          options={{
            title: "Camera",
            headerShown: false,
            // Non-interactive custom tab button
            tabBarButton: (props) => (
              <View
                style={[
                  props.style,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 57, 
                  },
                ]}
              >
                <TabIcon color="#2C9C4B" />
                <Text 
                  style={{ 
                    color: "#2C9C4B", 
                    fontWeight: "bold", 
                    fontSize: 12, 
                    marginTop: 5,
                  }}
                >
                  Capture
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: "Notification",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bell}
                color={color}
                name="Notification"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      {/* Floating Action Button */}
      <CustomFAB
        onPress={() => router.push("camera")}
        iconSource={icons.camera}
      />
      <StatusBar style="dark" />
    </>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 50, // Adjust based on your tab bar height
    alignSelf: "center",
    backgroundColor: "#2C9C4B", // Green background for FAB
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default TabsLayout;
