export const weatherApi = {
  fetchWeather: async (latitude = 10.46, longitude = 123.9) => {
    const apiKey = "a764b1a399cf6aa08880d483fd94ee74";
    const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    console.log(url); // Log the URL to check
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error.message || error);
      return null;
    }
  },
};
