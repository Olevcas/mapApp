import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Box from "proximity/components/Box.js";
import TutorialCard from '../components/TutorialCard';


export default function HomeScreen() {


    return (
        <View style={styles.container}>
            <Text style={styles.header}> Welcome to proximity </Text>

            <View style={styles.tutBox}>
                <Text style={styles.tutText}>In this application you have the opportunity to locate the name and population of Italian cities within a specified radius.</Text>
            </View>

            <TutorialCard number="1"></TutorialCard>
            <TutorialCard number="2"></TutorialCard>

        </View>


    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 35,
    },
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "lightblue",
        alignItems: "center",
        gap: 20,

    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    tutText: {
        fontSize: 20,
        textAlign: "center"
    },
    tutBox: {
        width: "90%",
        backgroundColor: "white",
        padding: 10,
        borderRadius: "8",
    }
});



