import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getDistance, isPointWithinRadius } from 'geolib';
import Slider from '@react-native-community/slider';

import citiesData from '../it.json';

const milanRegion = {
  latitude: 45.464664,
  longitude: 9.179540,
  latitudeDelta: 0.2222,
  longitudeDelta: 0.2221,
};

export default function App() {
  const [range, setRange] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [mainLat, setMainLat] = useState(45.464664);
  const [mainLng, setMainLng] = useState(9.179540);

  const updateMarkers = (radius) => {

    const center = { latitude: mainLat, longitude: mainLng };


    const filteredCities = citiesData.filter((city) => {
      const cityLat = parseFloat(city.lat);
      const cityLng = parseFloat(city.lng);
      return isPointWithinRadius(center, { latitude: cityLat, longitude: cityLng }, radius);
    });

    const newMarkers = filteredCities.map((city) => ({
      key: city.city,
      coordinate: {
        latitude: parseFloat(city.lat),
        longitude: parseFloat(city.lng),
      },
      title: city.city,
      description: `Population: ${city.population}`,
    }));

    setMarkers(newMarkers);
  };

  const handleSliderChange = (value) => {
    setRange(parseInt(value));
  };

  const handleConfirmButtonPress = () => {
    updateMarkers(range * 1000);
    setIsViewVisible(false);
  };

  const toggleViewVisibility = () => {
    setIsViewVisible(!isViewVisible);
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMainLat(latitude);
    setMainLng(longitude);
  }



  return (
    <View style={styles.container}>
      <View style={styles.mapbox}>
        {isViewVisible && (<View style={styles.card}>
          <Text style={{ fontSize: 20 }}>Choose your distance</Text>
          <Slider onValueChange={handleSliderChange} style={{ width: '90%', height: 60 }} minimumValue={0} maximumValue={1250} step={20} value={range} minimumTrackTintColor="white" maximumTrackTintColor="white" />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{range + " km"}</Text>
          <Text style={styles.confirmButton} onPress={handleConfirmButtonPress}>Confirm distance</Text>
        </View>)}
        <Text onPress={toggleViewVisibility} style={styles.settingsButton}>Show menu</Text>

        <MapView style={styles.map} initialRegion={milanRegion}>
          <Marker coordinate={{ latitude: 45.464664, longitude: 9.179540 }} pinColor='blue' draggable onDragEnd={handleMapPress}></Marker>
          {markers.map((marker) => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    </View>
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
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 10,
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
    bottom: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
    alignItems: 'center',
    textAlign: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden"

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
    gap: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
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
