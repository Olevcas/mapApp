import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { getDistance, isPointWithinRadius } from 'geolib';
import CityCard from "proximity/components/CityCard.js";
import { useRoute } from '@react-navigation/native';
import GIF from 'proximity/images/foss.gif'; // Make sure this path is correct
import { useCities } from "proximity/Contexts/CitiesContext.js";




const CityList = () => {

    const { filteredCities } = useCities();

    const renderCityItem = (city) => {
        const cityLng = parseFloat(city.coordinates.lon);
        const cityLat = parseFloat(city.coordinates.lat);
        const formatter = Intl.NumberFormat("no", { notation: "compact" });
        const formattedPop = formatter.format(city.population);
        const dist = getDistance({ latitude: 45.464664, longitude: 9.179540 }, { latitude: cityLat, longitude: cityLng }) / 1000;

        return (
            <CityCard cityName={city.name} population={formattedPop} distance={dist}>
            </CityCard>
        );
    };

    const renderItem = ({ item }) => {
        return renderCityItem(item);
    };


    return (
        <ImageBackground source={GIF} style={{ width: "100%", height: "100%" }}>
            <View style={styles.container}>
                <Text style={styles.header}>List of Cities </Text>
                <FlatList
                    style={styles.flat}
                    data={filteredCities}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.city}
                    onEndReachedThreshold={0.1} // Adjust as needed
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
        marginTop: "10%"

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
});

export default CityList;
