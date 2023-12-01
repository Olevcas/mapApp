import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import citiesData from '../it.json';
import { isPointWithinRadius } from 'geolib';

const CityList = () => {
    const renderCityItem = (city) => {
        // Call your function for each city here
        console.log(`Processing city: ${city.city}`);
        const cityLng = parseFloat(city.lng);
        const cityLat = parseFloat(city.lat);
        const isWithin = isPointWithinRadius({ latitude: 45.464664, longitude: 9.179540 }, { latitude: cityLat, longitude: cityLng }, 100000)
        if (isWithin) {
            console.log("City is within radius")
        }

        return (
            <View style={styles.cityItem}>
                <Text style={styles.cityName}>{city.city}</Text>
                <Text>Population: {city.population}</Text>
                <Text>Latitude: {city.lat}</Text>
                <Text>Longitude: {city.lng}</Text>
                <Text>Admin Name: {city.admin_name}</Text>
            </View>
        );
    };

    const renderItem = ({ item }) => {
        return renderCityItem(item);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>List of Cities</Text>
            <FlatList
                data={citiesData}
                renderItem={renderItem}
                keyExtractor={(item) => item.city}
                onEndReachedThreshold={0.1} // Adjust as needed
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cityItem: {
        marginBottom: 15,
    },
    cityName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default CityList;
