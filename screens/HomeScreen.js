import React from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView } from 'react-native';
import Box from "proximity/components/Box.js";
import TutorialCard from '../components/TutorialCard';
import GIF from 'proximity/images/foss.gif'; // Make sure this path is correct




export default function HomeScreen() {



    return (
        <ImageBackground source={GIF} style={{ width: "100%", height: "100%" }}>


            <View style={styles.container}>
                <Text style={styles.header}> Welcome to proximity </Text>

                <View style={styles.tutBox}>
                    <Text style={styles.tutText}>Below you will find a quick tutorial</Text>
                </View>

                <ScrollView style={styles.scroll}>

                    <TutorialCard number="1" header="Navigate to the Map page to start filtering cities:"></TutorialCard>
                    <TutorialCard number="2" header="Press the 'Show menu' button and set a radius:"></TutorialCard>
                    <TutorialCard number="3" header="Confirm the radius, and let the map show the relevant cities!"></TutorialCard>
                    <TutorialCard number="4" header="To get a list view of the cities, head over to the City List page:"></TutorialCard>

                </ScrollView>


            </View>


        </ImageBackground>



    );
}

const styles = StyleSheet.create({
    scroll: {
        width: "100%",
        paddingHorizontal: 20,
        marginTop: -10
    },
    header: {
        fontSize: 40,
        fontFamily: "Impact",
        color: "white",
        marginBottom: -10
    },
    container: {
        marginTop: "10%",
        paddingTop: 10,
        flex: 1,
        alignItems: "center",
        gap: 20,

    },
    tutText: {
        fontSize: 20,
        textAlign: "center",
        color: "white",
        fontWeight: "bold"
    },
    tutBox: {
        width: "100%",
        padding: 0,
        borderRadius: 8,
    }
});



