import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { getDistance, isPointWithinRadius } from 'geolib';


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


  return (
    <View style={styles.container}>
      <View style={styles.mapbox}>
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
  },
  mapbox: {
    width: '90%',
    height: '92%',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#000',
    justifyContent: "center",
    backgroundColor: "purple",
    overflow: 'hidden'

  },

});



