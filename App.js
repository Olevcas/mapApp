import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { getDistance } from 'geolib';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/HomeScreen"
import Profile from "./screens/Profile"
import MapPage from "./screens/MapPage"
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

const milanRegion = {
  latitude: 45.464664,
  longitude: 9.179540,
  latitudeDelta: 0.2222,
  longitudeDelta: 0.2221,
};

const testDistance = getDistance(
  { latitude: 51.5103, longitude: 7.49347 },
  { latitude: 51.5103, longitude: 7.39347 }
);

console.log(testDistance);

export default function App() {


  return (

    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({ color, size }) => (<Ionicons name="home-outline" size={24} color="black" />)
        }} />
        <Tab.Screen name="MapPage" component={MapPage} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-map-outline" size={24} color="black" />)
        }} />
        <Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={24} color="black" />)
        }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});



