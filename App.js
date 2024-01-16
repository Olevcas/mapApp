import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/HomeScreen"
import CityList from "./screens/CityList"
import MapPage from "./screens/MapPage"
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CitiesProvider } from 'proximity/Contexts/CitiesContext.js';
import { Audio } from 'expo-av';

//Creates the navifation at the bottom of the screen
const Tab = createBottomTabNavigator();

export default function App() {

  //Line 18 to 36 creates functions to play the background music
  const [sound, setSound] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('proximity/music/song1.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    //The line of code below starts the music
    //playSound();

    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, []);




  return (

    < CitiesProvider /* This component is a context that allows the filteredCities variable to be transported across files */>
      < NavigationContainer /* Below are the different tabs of the navigation bar with the name and icon of each tab*/>
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarInactiveTintColor: "seagreen" }}>
          <Tab.Screen name="Tutorial" component={HomeScreen} options={{
            tabBarIcon: ({ color, size }) => (<Ionicons name="home-outline" size={24} style={{ color: "seagreen" }} />)
          }} />
          <Tab.Screen name="Explore" component={MapPage} options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons style={{ color: "seagreen" }} name="md-map-outline" size={24} color="black" />)
          }} />
          <Tab.Screen name="City List" component={CityList} options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons style={{ color: "seagreen" }} name="city-variant-outline" size={24} color="black" />)
          }} />

        </Tab.Navigator>
      </NavigationContainer >
    </CitiesProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});



