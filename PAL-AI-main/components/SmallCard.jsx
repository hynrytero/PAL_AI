import { View, Text, Image } from "react-native";
import React from "react";

const SmallCard = ({ time, image, degrees, bgcolor }) => {
  return (
    <View
      className={`flex-col w-[75px] h-auto rounded-[5px] justify-center items-center py-3 bg-[${bgcolor}] mr-2`}
    >
      <Text className="text-white font-pregular">{time}</Text>
      <Image
        source={image}
        className="h-[65px] w-[65px] my-1"
        resizeMode="contain"
      />
      <Text className="text-white font-pmedium">{degrees}°</Text>
    </View>
  );
};

export default SmallCard;
