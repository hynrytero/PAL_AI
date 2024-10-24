import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  borderStyle,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View className={`space-y-1 ${otherStyles}`}>
      <Text className="text-base text-black font-psemibold">{title}</Text>
      <View
        className={`border-[1px] border-gray-300 w-full h-[50px] px-4 rounded-md focus:border-secondary items-center flex-row bg-white opacity-70 ${borderStyle}`}
      >
        <TextInput
          className="flex-1 text-gray-500 font-pmedium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#0f0f0f"
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "Password" || title === "Confirm Password") &&
            !showPassword
          }
          keyboardType={keyboardType}
        />
        {(title === "Password" || title === "Confirm Password") && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
