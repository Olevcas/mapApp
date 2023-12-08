import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function TutorialCard(props) {

    const cityName = props.cityName;
    const population = props.population;
    const distance = props.distance;
    const number = props.number;

    return (

        <View style={style.container}>
            <Text style={style.numberBox}>  {number}</Text>
        </View>

    );
}

export default TutorialCard;

const style = StyleSheet.create({
    container: {
        width: "90%",
        height: "30%",
        backgroundColor: "white"
        /*shadowColor: "black",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6.49,

        elevation: 12, */
    },
    numberBox: {
        position: "relative",
        width: 80,
        height: 80,
        backgroundColor: "yellow",
        fontSize: 60,
    }

});