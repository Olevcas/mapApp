import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Linking, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ExtendedCityCard from './ExtendedCityCard';





function CityCard(props) {


    const [extended, setExtended] = useState(false);

    const toggleExtended = () => {
        props.onToggleExtendedCard();
        setExtended(!extended);

    };

    const cityName = props.cityName;
    const population = props.population;
    const distance = props.distance;


    const cityLat = parseFloat(props.cityLat);
    const cityLng = parseFloat(props.cityLng);


    return (


        <View style={style.container}>
            <View style={style.cardbox}>
                <Text style={style.header}>{cityName}</Text>
                <Text style={style.texts}>Population: {population}</Text>
                <Text style={style.texts}>Distance: {distance} km</Text>
                <TouchableOpacity onPress={toggleExtended}>
                    <Text style={style.moreInfoButton}>More Info</Text>
                </TouchableOpacity>
            </View>


            <Modal
                visible={extended}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setExtended(false)}
            >
                <ExtendedCityCard
                    cityName={cityName}
                    cityLat={cityLat}
                    cityLng={cityLng}
                    wikipediaPage={'https://en.wikipedia.org/wiki/' + cityName + ''}
                    onClose={() => setExtended(false)}
                />

            </Modal>
        </View>

    );
}

export default CityCard;

const style = StyleSheet.create({
    cardbox: {
        width: "100%",
        justifyContent: "center",
        overflow: 'hidden',
        padding: 15,
        gap: 15,
        elevation: 12,
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: "seagreen"
    },
    texts: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2b2b2b"

    },
    container: {
        width: "100%",
        opacity: 0.8,
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
        fontSize: 30,
        fontWeight: "bold",
        color: "#2b2b2b"
    },
    moreInfoButton: {
        fontSize: 18,
        color: 'blue',
        marginLeft: 'auto', // Add this line
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
});