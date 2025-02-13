import { View, Text, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton";
import { storeRecommenderApi } from "../api/nearby-api";  
import * as Location from "expo-location"; 
import * as Linking from "expo-linking";

const Nearby = () => {
  const [region, setRegion] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      setHasLocationPermission(true);
      getUserLocation();
    } else {
      setHasLocationPermission(false);
      Alert.alert(
        "Location Permission Required",
        "To use this feature, please enable location access in your settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() }
        ]
      );
    }
  };

  const getUserLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });

    fetchNearbyStores(location.coords.latitude, location.coords.longitude);
  };

  const fetchNearbyStores = async (latitude, longitude) => {
    const storesData = await storeRecommenderApi.fetchNearbyStores(latitude, longitude);
    if (storesData) {
      setStores(storesData);
    }
    setLoading(false);
  };

  const startNavigation = () => {
    if (!selectedStore) {
      Alert.alert("Select a Store", "Please select a store to navigate.");
      return;
    }

    const { lat, lng } = selectedStore.geometry.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;

    Linking.openURL(url).catch((err) => console.error("Failed to open Google Maps", err));
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "white", marginBottom: 10 }}>
          <Icon name="chevron-left" size={40} color="black" onPress={() => router.back()} />
          <Text style={{ fontSize: 30, fontWeight: "600", marginLeft: 10 }}>Store Nearby</Text>
        </View>

        {region ? (
          <MapView
            style={{ flex: 1 }} // Keep map size fixed
            initialRegion={region}
            provider="google"
            showsUserLocation={true}
            showsMyLocationButton={false} // Removes Google Maps default button
            toolbarEnabled={false}
            onPress={() => setSelectedStore(null)} // Deselect store on map tap
          >
            {stores.map((store, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: store.geometry.location.lat,
                  longitude: store.geometry.location.lng,
                }}
                title={store.name}
                description={store.vicinity}
                onPress={() => setSelectedStore(store)} // Set selected store on marker press
                pinColor="dark green"
              />
            ))}
          </MapView>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
        )}

        {/* Show Start Navigation Button Only When a Store is Selected */}
        {selectedStore && (
          <View style={{
            position: "absolute",
            bottom: 20, // Fixed at the bottom
            left: 0,
            right: 0,
            alignItems: "center",
          }}>
            <CustomButton
              title="Start Navigation"
              handlePress={startNavigation}
              containerStyles="w-11/12"
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default Nearby;