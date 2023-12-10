import React, { useState, useEffect, useRef } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getDistance, isPointWithinRadius } from 'geolib';
import Slider from '@react-native-community/slider';
import citiesData from '../it3.json';
import { useNavigation } from '@react-navigation/native';
import { useCities } from "proximity/Contexts/CitiesContext.js";
import SettingsCard from "proximity/components/SettingsCard.js"
import { Audio } from 'expo-av';
import ExtendedCityCard from '../components/ExtendedCityCard';


const milanRegion = {
  latitude: 45.464664,
  longitude: 9.179540,
  latitudeDelta: 0.2222,
  longitudeDelta: 0.2221,
};

export default function MapPage() {


  const { setFilteredCities } = useCities();
  const [range, setRange] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [isExtendedVisible, setIsExtendedVisible] = useState(false);
  const [mainLat, setMainLat] = useState(45.464664);
  const [mainLng, setMainLng] = useState(9.179540);
  const [minLat, setMinLat] = useState(1000);
  const [maxLat, setMaxLat] = useState(0);
  const [minLng, setMinLng] = useState(1000);
  const [maxLng, setMaxLng] = useState(0);
  const [newMilanRegion, setNewMilanRegion] = useState(milanRegion);
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);


  // For sound
  const [sound, setSound] = React.useState();
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('proximity/music/damn.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


  const updateMarkers = (radius) => {

    const center = { latitude: mainLat, longitude: mainLng };


    const filteredCities = citiesData.filter((city) => {
      const cityLat = parseFloat(city.coordinates.lat);
      const cityLng = parseFloat(city.coordinates.lon);


      return isPointWithinRadius(center, { latitude: cityLat, longitude: cityLng }, radius);
    });

    const newMarkers = filteredCities.map((city) => ({
      key: city.name,
      coordinate: {
        latitude: parseFloat(city.coordinates.lat),
        longitude: parseFloat(city.coordinates.lon),
      },
      title: city.name,
      description: `Population: ${city.population}`,
    }));
    setMarkers(newMarkers);

    let newMinLat = 1000,
      newMaxLat = 0,
      newMinLng = 1000,
      newMaxLng = 0;

    newMarkers.forEach((marker) => {
      const { latitude, longitude } = marker.coordinate;
      newMinLat = Math.min(newMinLat, latitude);
      newMaxLat = Math.max(newMaxLat, latitude);
      newMinLng = Math.min(newMinLng, longitude);
      newMaxLng = Math.max(newMaxLng, longitude);
    });

    setMinLat(newMinLat);
    setMaxLat(newMaxLat);
    setMinLng(newMinLng);
    setMaxLng(newMaxLng);

    setMarkers(newMarkers);
    return filteredCities;
  };

  useEffect(() => {
    const updatedRegion = {
      latitude: minLat + (maxLat - minLat) / 2,
      longitude: minLng + (maxLng - minLng) / 2,
      latitudeDelta: maxLat - minLat + (maxLat - minLat) / 4, // Adding a buffer to adjust the view
      longitudeDelta: maxLng - minLng + (maxLng - minLng) / 4,
    };
    setNewMilanRegion(updatedRegion);
  }, [minLat, maxLat, minLng, maxLng]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(newMilanRegion, 1000); // Adjust the duration as needed
    }
  }, [newMilanRegion]);

  const handleSliderChange = (value) => {
    setRange(parseInt(value));
  };

  const handleConfirmButtonPress = () => {
    playSound();    // adds sound to the button
    const filteredCities = updateMarkers(range * 1000);
    setIsViewVisible(false);
    const updatedRegion = {
      latitude: minLat + (maxLat - minLat) / 2,
      longitude: minLng + (maxLng - minLng) / 2,
      latitudeDelta: maxLat - minLat + (maxLat - minLat) / 4,
      longitudeDelta: maxLng - minLng + (maxLng - minLng) / 4,
    };
    setNewMilanRegion(updatedRegion);
    setFilteredCities(filteredCities);
  }

  const toggleViewVisibility = () => {
    setIsViewVisible(!isViewVisible);
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMainLat(latitude);
    setMainLng(longitude);
  }
  const toggleExtended = (marker) => {
    setSelectedMarker(marker);
    setIsExtendedVisible(true);
  }


  return (
    <View style={styles.container}>
      <View style={styles.mapbox}>
        {isExtendedVisible && (<ExtendedCityCard cityName={selectedMarker.title}
          cityLat={selectedMarker.coordinate.latitude}
          cityLng={selectedMarker.coordinate.longitude}
          wikipediaPage={'https://en.wikipedia.org/wiki/' + selectedMarker.title + ''} onClose={() => setIsExtendedVisible(false)}></ExtendedCityCard>)}
        {isViewVisible && (<SettingsCard updateRange={(value) => setRange(value)} handleConfirmButtonPress={handleConfirmButtonPress}></SettingsCard>)}
        <TouchableOpacity style={styles.settingsButton} onPress={toggleViewVisibility}><Text style={styles.buttonText}>Show menu</Text></TouchableOpacity>
        <MapView style={styles.map} initialRegion={milanRegion} ref={mapRef}>
          <Marker coordinate={{ latitude: 45.464664, longitude: 9.179540 }} pinColor='blue' draggable onDragEnd={handleMapPress} />
          {markers.map((marker) => (
            <>
              <Marker
                key={marker.key}
                coordinate={marker.coordinate}
              >
                <Callout>
                  <View>
                    <Text>{marker.title}</Text>
                    <Text>{marker.description}</Text>
                    <TouchableOpacity onPress={() => toggleExtended(marker)} >
                      <Text >More Info</Text>
                    </TouchableOpacity>
                  </View>
                </Callout>
              </Marker>
            </>

          ))}
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 70,
    height: 70,
    bottom: 9,
    right: 9,
    paddingLeft: 3,
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "seagreen",
    overflow: "hidden",
    textAlign: "center",

  },
  buttonText: {
    color: "seagreen",
    fontWeight: "bold"
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
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.77,
    shadowRadius: 12.49,

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
  },

});
