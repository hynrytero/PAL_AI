import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  FlatList,
  StyleSheet,
} from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import { images } from "../../constants";

const users = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
  },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Smith",
  },
  {
    id: 3,
    firstname: "Alice",
    lastname: "Johnson",
  },
];

const Users = () => {
  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userName}>{item.firstname} {item.lastname}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={images.background_history}
      className="flex-1 h-full w-full bg-white"
    >
      <ScrollView className="mt-12">
        <SafeAreaView className="px-7 w-full h-full mb-10">
          <View className="flex-row items-center w-full mb-3">
            <Text className="font-pmedium text-[30px]">Users</Text>
          </View>
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
          />
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  userName: {
    fontSize: 18,
    color: '#333',
  },
});

export default Users;