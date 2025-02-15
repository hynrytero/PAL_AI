export const storeRecommenderApi = {
  fetchNearbyStores: async (latitude = 10.46, longitude = 123.9) => {
    const apiKey = "AIzaSyCMeNsZsejyD2YYtTtUyycbUdD2l8ZG3-g"; 
    const radius = 5000; 
    const type = "store"; 
    const keyword = "agriculture"; 

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&keyword=${keyword}&key=${apiKey}`;

    //console.log(url); 

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching stores: ${response.statusText}`);
      }

      const data = await response.json();
      return data.results; // Returns an array of nearby stores
    } catch (error) {
      console.error("Error fetching store data:", error.message || error);
      return null;
    }
  },
};
