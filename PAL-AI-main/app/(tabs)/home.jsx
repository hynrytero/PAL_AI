import { View, Text, ImageBackground, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import WeatherCard from "../../components/SmallCard";
import { images, icons } from "../../constants";
import { weatherApi } from "../api/weather-api";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location] = useState({
    latitude: 10.46,
    longitude: 123.9,
    city: "Cambinocot",
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await weatherApi.fetchWeather(
        location.latitude,
        location.longitude
      );
      setWeatherData(data);
    };

    fetchWeatherData(); // Fetch weather data without relying on dynamic location
  }, [location]);

  if (!weatherData) {
    return (
      <ImageBackground
        source={images.backgroundmain}
        className="flex-1 h-full justify-center items-center"
        resizeMode="cover"
        imageStyle={{ opacity: 0.03 }}
      >
        <Text className="text-lg text-[#24609B]">Loading weather data...</Text>
      </ImageBackground>
    );
  }
  const { list } = weatherData; // Get hourly forecast data from the response

  const currentWeather = weatherData.list[0];
  const dailyForecast = weatherData.list.slice(1, 4); // You can adjust this to fit your daily forecast data

  const capitalizeFirstLetter = (str) => {
    return str
      .split(" ") // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words back into a single string
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
                  {location.city}
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
