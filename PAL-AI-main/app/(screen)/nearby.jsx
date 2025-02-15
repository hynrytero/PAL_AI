import { View, Text, ActivityIndicator, Alert, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { router } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import CustomButton from "../../components/CustomButton";
import { storeRecommenderApi } from "../api/nearby-api";  
import * as Location from "expo-location"; 
import * as Linking from "expo-linking";

const GOOGLE_MAPS_API_KEY = 'AIzaSyCMeNsZsejyD2YYtTtUyycbUdD2l8ZG3-g'; // e butang pani sa environment variable must not be exposed

const Nearby = () => {
  const [region, setRegion] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const locationSubscription = useRef(null);
  
  // Animation values
  const mapAnimation = useRef(new Animated.Value(0)).current;
  const routeDetailsAnimation = useRef(new Animated.Value(0)).current;
  const regionAnimation = useRef(new Animated.Value(0)).current;
  const initialRegionRef = useRef(null);
  const targetRegionRef = useRef(null);

  useEffect(() => {
    requestLocationPermission();
    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (initialRegionRef.current && targetRegionRef.current) {
      const listener = regionAnimation.addListener(({ value }) => {
        const newRegion = {
          latitude: initialRegionRef.current.latitude + (targetRegionRef.current.latitude - initialRegionRef.current.latitude) * value,
          longitude: initialRegionRef.current.longitude + (targetRegionRef.current.longitude - initialRegionRef.current.longitude) * value,
          latitudeDelta: initialRegionRef.current.latitudeDelta + (targetRegionRef.current.latitudeDelta - initialRegionRef.current.latitudeDelta) * value,
          longitudeDelta: initialRegionRef.current.longitudeDelta + (targetRegionRef.current.longitudeDelta - initialRegionRef.current.longitudeDelta) * value,
        };
        setRegion(newRegion);
      });

      return () => {
        regionAnimation.removeListener(listener);
      };
    }
  }, [regionAnimation]);

  useEffect(() => {
    const setupLocationTracking = async () => {
      if (isNavigating) {
        if (locationSubscription.current) {
          await locationSubscription.current.remove();
        }
        
        const subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          async (location) => {
            const newUserLocation = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };
            setUserLocation(newUserLocation);
            
            if (selectedStore) {
              await fetchRoute(newUserLocation, selectedStore);
            }
          }
        );
        
        locationSubscription.current = subscription;
      } else {
        if (locationSubscription.current) {
          await locationSubscription.current.remove();
          locationSubscription.current = null;
        }
      }
    };

    setupLocationTracking();
  }, [isNavigating, selectedStore]);

  const animateToRegion = (newRegion) => {
    initialRegionRef.current = region;
    targetRegionRef.current = newRegion;
    
    regionAnimation.setValue(0);
    
    Animated.timing(regionAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const decodePolyline = (encoded) => {
    const points = [];
    let index = 0, lat = 0, lng = 0;

    while (index < encoded.length) {
      let shift = 0, result = 0;
      
      let byte;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({
        latitude: lat * 1e-5,
        longitude: lng * 1e-5,
      });
    }

    return points;
  };

  const fetchRoute = async (origin, destination) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.geometry.location.lat},${destination.geometry.location.lng}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`
      );
      
      const result = await response.json();
      
      if (result.routes.length) {
        const route = result.routes[0];
        const points = decodePolyline(route.overview_polyline.points);
        setRouteCoordinates(points);
        
        const leg = route.legs[0];
        setRouteDetails({
          distance: leg.distance.text,
          duration: leg.duration.text,
          steps: leg.steps.map(step => ({
            distance: step.distance.text,
            duration: step.duration.text,
            instructions: step.html_instructions.replace(/<[^>]*>/g, ''),
          }))
        });

        const bounds = route.bounds;
        const newRegion = {
          latitude: (bounds.northeast.lat + bounds.southwest.lat) / 2,
          longitude: (bounds.northeast.lng + bounds.southwest.lng) / 2,
          latitudeDelta: Math.abs(bounds.northeast.lat - bounds.southwest.lat) * 1.5,
          longitudeDelta: Math.abs(bounds.northeast.lng - bounds.southwest.lng) * 1.5,
        };
        
        animateToRegion(newRegion);
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      Alert.alert('Error', 'Unable to fetch route. Please try again.');
    }
  };

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
    const userCoords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setUserLocation(userCoords);
    setRegion({
      ...userCoords,
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

  const startNavigation = async () => {
    if (!selectedStore || !userLocation) {
      Alert.alert("Select a Store", "Please select a store to navigate.");
      return;
    }

    try {
      Animated.parallel([
        Animated.timing(mapAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(routeDetailsAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true
        })
      ]).start();

      await fetchRoute(userLocation, selectedStore);
      setIsNavigating(true);
    } catch (error) {
      Alert.alert('Error', 'Unable to start navigation. Please try again.');
    }
  };

  const stopNavigation = async () => {
    Animated.parallel([
      Animated.timing(mapAnimation, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.timing(routeDetailsAnimation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true
      })
    ]).start(() => {
      setIsNavigating(false);
      setRouteCoordinates(null);
      setRouteDetails(null);
      if (userLocation) {
        const defaultRegion = {
          ...userLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        animateToRegion(defaultRegion);
      }
    });
  };

  const mapStyle = {
    transform: [
      {
        scale: mapAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2]
        })
      }
    ]
  };

  const routeDetailsStyle = {
    opacity: routeDetailsAnimation,
    transform: [
      {
        translateY: routeDetailsAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0]
        })
      }
    ]
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "white", marginBottom: 10 }}>
          <Icon name="chevron-left" size={40} color="black" onPress={() => router.back()} />
          <Text style={{ fontSize: 30, fontWeight: "600", marginLeft: 10 }}>
            {isNavigating ? "Navigation" : "Store Nearby"}
          </Text>
        </View>

        {region ? (
          <Animated.View style={[{ flex: 1 }, mapStyle]}>
            <MapView
              style={{ flex: 1 }}
              region={region}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              showsMyLocationButton={true}
              toolbarEnabled={false}
              onPress={() => !isNavigating && setSelectedStore(null)}
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
                  onPress={() => !isNavigating && setSelectedStore(store)}
                  pinColor={selectedStore === store ? "red" : "dark green"}
                />
              ))}
              {routeCoordinates && (
                <Polyline
                  coordinates={routeCoordinates}
                  strokeColor="#0000FF"
                  strokeWidth={6}
                />
              )}
            </MapView>
          </Animated.View>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
        )}

        {selectedStore && (
          <View style={{
            position: "absolute",
            bottom: routeDetails ? 80 : 20,
            left: 0,
            right: 0,
            alignItems: "center",
          }}>
            {routeDetails && (
              <Animated.View style={[{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
                width: "90%",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }, routeDetailsStyle]}>
                <Text style={{ fontWeight: "bold" }}>
                  {routeDetails.distance} • {routeDetails.duration}
                </Text>
                {routeDetails.steps[0] && (
                  <Text numberOfLines={2} style={{ marginTop: 5 }}>
                    Next: {routeDetails.steps[0].instructions}
                  </Text>
                )}
              </Animated.View>
            )}
            <CustomButton
              title={isNavigating ? "Stop Navigation" : "Start Navigation"}
              handlePress={isNavigating ? stopNavigation : startNavigation}
              containerStyles="w-11/12"
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default Nearby;