import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  disabled, 
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? null : handlePress} // Prevent press when disabled
      activeOpacity={0.7}
      className={`bg-secondary rounded-md min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading || disabled ? "opacity-50" : ""
      }`}
      disabled={isLoading || disabled} // Disable button when loading OR explicitly disabled
    >
      <Text className={`text-white font-psemibold text-xl ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
