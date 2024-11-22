import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from "react-native";
import { icons } from "../constants"; // Assuming icons for the dropdown

const CustomDropdown = ({
  title,
  value,
  data,
  placeholder,
  handleChange,
  otherStyles,
  isSearchable,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredData = isSearchable
    ? data.filter((item) =>
        item.label.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-semibold">{title}</Text>

      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="border-[1px] border-gray-300 w-full h-[50px] px-4 rounded-lg flex-row bg-white items-center justify-between"
      >
        <Text className={`text-gray-700 font-medium text-base`}>
          {value ? value : placeholder}
        </Text>
        <Image
          source={icons.downArrow} // Replace with the desired arrow icon
          className="w-5 h-5"
        />
      </TouchableOpacity>

      {/* Modal for Dropdown List */}
      {isOpen && (
        <Modal
          transparent={true}
          visible={isOpen}
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}
        >
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onPress={() => setIsOpen(false)}
          >
            <View
              style={{
                position: "absolute",
                top: "20%",
                left: 0,
                right: 0,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                marginHorizontal: 20,
              }}
            >
              {isSearchable && (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 10,
                  }}
                  placeholder="Search..."
                  value={searchText}
                  onChangeText={setSearchText}
                />
              )}

              <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      handleChange(item.value);
                      setIsOpen(false);
                    }}
                    className="py-2 px-4 border-b-[1px] border-gray-200"
                  >
                    <Text className="text-base text-gray-700">
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.value}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default CustomDropdown;
