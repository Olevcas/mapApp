import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { getDistance } from 'geolib';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/HomeScreen"
import CityList from "./screens/CityList"
import MapPage from "./screens/MapPage"
import { Ionicons } from '@expo/vector-icons';
import { CitiesProvider } from 'proximity/Contexts/CitiesContext.js';




const Tab = createBottomTabNavigator();

export default function App() {


  return (
    <CitiesProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Proximity" component={HomeScreen} options={{
            tabBarIcon: ({ color, size }) => (<Ionicons name="home-outline" size={24} color="black" />)
          }} />
          <Tab.Screen name="Map Page" component={MapPage} options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-map-outline" size={24} color="black" />)
          }} />
          <Tab.Screen name="City List" component={CityList} options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={24} color="black" />)
          }} />

        </Tab.Navigator>
      </NavigationContainer>
    </CitiesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});



