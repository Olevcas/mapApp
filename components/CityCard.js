import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function CityCard(props) {

    const cityName = props.cityName;
    const population = props.population;
    const distance = props.distance;

    return (

        <View style={style.container}>
            <View style={style.cardbox}>

                <Text style={style.header}>{cityName}</Text>
                <Text style={style.texts}>Population: {population}</Text>
                <Text style={style.texts}>Distance: {distance} km</Text>

            </View>
        </View>

    );
}

export default CityCard;

const style = StyleSheet.create({
    cardbox: {
        width: "100%",
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#000',
        justifyContent: "center",
        overflow: 'hidden',
        padding: 15,
        gap: 15,
        elevation: 12,
        backgroundColor: "white",
        marginBottom: 20
    },
    texts: {
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        width: "100%",
        /*shadowColor: "black",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6.49,

        elevation: 12, */
        alignItems: "center",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold"
    }

});