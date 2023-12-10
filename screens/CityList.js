import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { getDistance, isPointWithinRadius } from 'geolib';
import CityCard from "proximity/components/CityCard.js";
import { useRoute } from '@react-navigation/native';
import GIF from 'proximity/images/foss.gif'; // Make sure this path is correct
import { useCities } from "proximity/Contexts/CitiesContext.js";
import { BlurView } from "expo-blur";
import ExtendedCityCard from '../components/ExtendedCityCard';




const CityList = () => {

    const { filteredCities } = useCities();
    const [isExtendedCardVisible, setIsExtendedCardVisible] = useState(false);
    const [sortBy, setSortBy] = useState('distance'); // 'distance' or 'population'

    const toggleExtendedCard = () => {
        setIsExtendedCardVisible(!isExtendedCardVisible);
    };

    const setSortByDistance = () => {
        setSortBy('distance');
    };

    const setSortByPopulation = () => {
        setSortBy('population');
    };

    const renderCityItem = (city) => {
        const cityLng = parseFloat(city.coordinates.lon);
        const cityLat = parseFloat(city.coordinates.lat);
        const formatter = Intl.NumberFormat("no", { notation: "compact" });
        const formattedPop = formatter.format(city.population);
        const dist = getDistance({ latitude: 45.464664, longitude: 9.179540 }, { latitude: cityLat, longitude: cityLng }) / 1000;

        return (

            <CityCard onToggleExtendedCard={toggleExtendedCard} cityName={city.name} population={formattedPop} distance={dist} cityLat={cityLat} cityLng={cityLng}>
            </CityCard>

        );
    };

    const renderItem = ({ item }) => {
        return renderCityItem(item);
    };

    const sortedCities = filteredCities.sort((cityA, cityB) => {
        if (sortBy === 'distance') {
            // Sort by distance
            const coordsA = cityA.coordinates;
            const coordsB = cityB.coordinates;
            const distanceA = getDistance({ latitude: 45.464664, longitude: 9.179540 }, { latitude: parseFloat(coordsA.lat), longitude: parseFloat(coordsA.lon) });
            const distanceB = getDistance({ latitude: 45.464664, longitude: 9.179540 }, { latitude: parseFloat(coordsB.lat), longitude: parseFloat(coordsB.lon) });
            return distanceA - distanceB;
        } else {
            // Sort by population
            return cityB.population - cityA.population;
        }
    });

    return (
        <ImageBackground source={GIF} style={{ width: "100%", height: "100%" }}>
            <View style={styles.container}>
                <Text style={styles.header}>List of Cities </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={setSortByDistance} style={[styles.sortButton, sortBy === 'distance' && styles.activeSortButton]}>
                        <Text style={styles.buttonText}>Sort by Distance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={setSortByPopulation} style={[styles.sortButton, sortBy === 'population' && styles.activeSortButton]}>
                        <Text style={styles.buttonText}>Sort by Population</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.flat}
                    data={sortedCities}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.coordinates.lat}
                    onEndReachedThreshold={0.1}
                />
            </View>
        </ImageBackground>
    );

};

const styles = StyleSheet.create({
    flat: {
        width: "100%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "5%"
    },
    container: {
        width: "100%",
        alignSelf: "center",
        alignItems: "center",
        marginBottom: "20%",
        marginTop: "9%",
        height: "100%",
        paddingBottom: "10%",


    },
    header: {
        fontSize: 45,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15,
        color: "white"
    },
    cityItem: {
        marginBottom: 15,
    },
    cityName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: "4%",
        height: "5%",
    },
    sortButton: {
        flex: 1,
        height: "100%",
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    activeSortButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Change color for active button
    },
});

export default CityList;
