import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location"; // Import location library
import WeatherCard from "../../components/SmallCard";
import { images, icons } from "../../constants";
import { weatherApi } from "../api/weather-api";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null); // Store location data
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Alert.alert("Location Error", "Please enable location permissions.");
        return;
      }

      try {
        // Fetch current location
        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        // Fetch weather data
        const data = await weatherApi.fetchWeather(
          location.coords.latitude,
          location.coords.longitude
        );
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching location or weather data:", error);
      }
    };

    fetchLocationAndWeather();
  }, []);

  if (!location || !weatherData) {
    return (
      <ImageBackground
        source={images.backgroundmain}
        className="flex-1 h-full justify-center items-center"
        resizeMode="cover"
        imageStyle={{ opacity: 0.03 }}
      >
        <Text className="text-lg text-[#24609B]">
          {errorMsg || "Loading weather data..."}
        </Text>
      </ImageBackground>
    );
  }

  const { list } = weatherData;
  const currentWeather = weatherData.list[0];
  const dailyForecast = weatherData.list.slice(1, 4);

  const capitalizeFirstLetter = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <ImageBackground
      source={images.backgroundmain}
      className="flex-1 h-full"
      resizeMode="cover"
      imageStyle={{ opacity: 0.03 }}
    >
      <ScrollView className="mb-[50px]">
        <ImageBackground
          source={images.backgroundweather}
          className="h-auto bg-[#C4E2FF] rounded-b-[30px] overflow-hidden"
          resizeMode="cover"
        >
          <View className="w-full h-auto px-7 pt-12 pb-4 rounded-b-[30px] flex-col items-center">
            <View className="flex-row items-start justify-between w-full my-5">
              <View className="flex-row w-auto items-bottom">
                <Image
                  source={icons.pin}
                  className="h-[25px] w-[25px] mr-3"
                  resizeMode="contain"
                />
                <Text className="font-psemibold text-[20px] text-[#24609B]">
                  Your Location
                </Text>
              </View>
              <Text className="text-[#24609B]">
                Today {new Date().toLocaleTimeString()}
              </Text>
            </View>
            <Image
              source={images.sun}
              className="h-[150px] w-[150px]"
              resizeMode="contain"
            />
            <Text className="font-pmedium text-[50px] text-[#24609B]">
              {Math.round(currentWeather.main.temp)}°
            </Text>
            <Text className="text-lg text-[#24609B]">
              {capitalizeFirstLetter(currentWeather.weather[0].description)}
            </Text>

            {/* Additional weather details */}
            <View className="flex-row mx-7 mt-5 bg-[#D3E9FF]  w-full rounded-[5px] p-[5px] justify-between items-center">
              <View className="flex-row w-auto items-bottom">
                <Image
                  source={icons.eye1}
                  className="h-[25px] w-[25px] mr-3"
                  resizeMode="contain"
                />
                <Text className="text-lg text-[#24609B]">
                  {currentWeather.main.humidity}%
                </Text>
              </View>
              <View className="flex-row w-auto items-bottom">
                <Image
                  source={icons.drop}
                  className="h-[25px] w-[25px] mr-3"
                  resizeMode="contain"
                />
                <Text className="text-lg text-[#24609B]">
                  {`${(list[0].pop * 100).toFixed(0)}%`} {/* chance of rain */}
                </Text>
              </View>
              <View className="flex-row w-auto items-bottom">
                <Image
                  source={icons.wind}
                  className="h-[25px] w-[25px] mr-3"
                  resizeMode="contain"
                />
                <Text className="text-lg text-[#24609B]">
                  {Math.round(currentWeather.wind.speed)} m/s
                </Text>
              </View>
            </View>

            {/* Daily Forecast */}
            <View className="flex-row mx-7 mt-5 bg-[#D3E9FF] w-full rounded-[5px] p-[10px] justify-between items-center">
              {dailyForecast.map((item, index) => {
                const forecastDate = new Date(item.dt * 1000); // Forecast date from API
                const today = new Date(); // Current date
                const tomorrow = new Date();
                tomorrow.setDate(today.getDate() + 1); // Set tomorrow's date

                // Set time to midnight for accurate date comparison
                today.setHours(0, 0, 0, 0);
                tomorrow.setHours(0, 0, 0, 0);
                forecastDate.setHours(0, 0, 0, 0); // Normalize forecast date

                // Determine the day label (Today, Tomorrow, or Weekday)
                let dayLabel = forecastDate.toLocaleDateString("en-US", {
                  weekday: "short",
                });

                if (forecastDate.toDateString() === today.toDateString()) {
                  dayLabel = "Today";
                } else if (
                  forecastDate.toDateString() === tomorrow.toDateString()
                ) {
                  dayLabel = "Tomorrow";
                }

                return (
                  <View
                    key={index}
                    className="bg-[#5284B7] w-[100px] rounded-[5px] justify-center items-center p-3 overflow-hidden"
                  >
                    <Image
                      source={images.circlesun}
                      className="absolute bottom-[-50] right-[-30]"
                    />
                    <Text className="text-white font-pmedium text-md">
                      {dayLabel}
                    </Text>
                    <Text className="font-pregular text-[40px] text-white">
                      {Math.round(item.main.temp)}°
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ImageBackground>

        {/* Hourly Forecast */}
        <View className="w-full h-auto pl-7">
          <View className="flex-row justify-between w-full py-3 pr-7">
            <Text className="font-psemibold">Today</Text>
            <Text className="font-pmedium">
              {new Date().toLocaleDateString()}
            </Text>
          </View>
          <View className="flex-row">
            {weatherData.list.slice(0, 5).map((item, index) => (
              <WeatherCard
                key={index}
                time={new Date(item.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                image={{
                  uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                }}
                degrees={Math.round(item.main.temp)}
                bgcolor="#7BAFE3"
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;
