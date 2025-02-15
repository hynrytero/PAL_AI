import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

const TermsAndCondition = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View className="flex-row items-center w-full mb-7">
          <Icon
            name="chevron-left"
            size={40}
            color="black"
            onPress={() => router.back()}
          />
          <Text style={styles.heading}>Terms and Conditions</Text>
        </View>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text style={styles.paragraph}>
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam
          varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus
          magna felis sollicitudin mauris. Integer in mauris eu nibh euismod
          gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis
          risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue,
          eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas
          fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla
          a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis,
          neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing
          sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque
          nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus
          quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis,
          molestie eu, feugiat in, orci. In hac habitasse platea dictumst.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default TermsAndCondition;
