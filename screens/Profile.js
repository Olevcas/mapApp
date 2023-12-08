import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getDistance, isPointWithinRadius } from 'geolib';
import CityCard from "proximity/components/CityCard.js";
import { useRoute } from '@react-navigation/native';



const CityList = () => {

    const route = useRoute();
    const { filteredCities } = route.params;

    const renderCityItem = (city) => {
        // Call your function for each city here
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
        <View style={styles.container}>
            <Text style={styles.header}>List of Cities within: </Text>
            <FlatList
                data={filteredCities}
                renderItem={renderItem}
                keyExtractor={(item) => item.city}
                onEndReachedThreshold={0.1} // Adjust as needed
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignSelf: "center",
        alignItems: "center"

    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15
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
