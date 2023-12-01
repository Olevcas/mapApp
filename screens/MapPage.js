import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getDistance, isPointWithinRadius } from 'geolib';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Slider from '@react-native-community/slider';

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

const testRadius = isPointWithinRadius(
  { latitude: milanRegion.latitude, longitude: milanRegion.longitude },
  { latitude: milanRegion.latitude + 0.02, longitude: milanRegion.longitude + 0.02 },
  3000
);
console.log(testRadius)

export default function App() {

  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const [range, setRange] = useState("0 km");

  const [isViewVisible, setIsViewVisible] = useState(false);

  const toggleViewVisibility = () => {
    setIsViewVisible(!isViewVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapbox}>
        {isViewVisible && (<View style={styles.card}>
          <Text style={{ fontSize: 20 }}>Choose your distance</Text>
          <Slider onValueChange={value => setRange(parseInt(value) + " km")} style={{ width: 200, height: 60 }} minimumValue={0} maximumValue={500} minimumTrackTintColor="white" maximumTrackTintColor="white" />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{range}</Text>
          <Text style={styles.confirmButton} onPress={toggleViewVisibility}>Confirm distance</Text>
        </View>)}
        <Text onPress={toggleViewVisibility} style={styles.settingsButton}>Show menu</Text>
        <MapView style={styles.map} initialRegion={milanRegion}>
          <Marker id="marker1" coordinate={{ latitude: milanRegion.latitude, longitude: milanRegion.longitude }} />
          <Marker id="marker2" coordinate={{ latitude: milanRegion.latitude + 0.02, longitude: milanRegion.longitude + 0.02 }} />
        </MapView>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue"
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: -10,
  },
  mapbox: {
    width: '95%',
    height: '92%', // Consider adjusting this height to leave space for the settings button
    position: 'relative',
    zIndex: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
  },
  sliderbox: {
    backgroundColor: "red",
    width: "100%",
    height: "60%"
  },
  menu: {
    width: "94%",
    borderRadius: 10,
  },
  settingsButton: {
    position: "absolute",
    zIndex: 200,
    backgroundColor: 'lightblue',
    width: 60, // Adjust the width as needed
    padding: 10,
    top: 435, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
    alignItems: 'center',
    textAlign: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black"

  },
  card: {
    width: "90%",
    backgroundColor: "lightblue",
    position: "absolute",
    borderRadius: 15,
    zIndex: 100,
    alignSelf: 'center',
    top: "30%",
    opacity: 1,
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    gap: 15
  },
  confirmButton: {
    fontSize: 20,
    alignItems: 'center',
    textAlign: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
    padding: 3,
    overflow: "hidden"
  }


});



