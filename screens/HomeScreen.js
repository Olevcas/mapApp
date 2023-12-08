import React from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView } from 'react-native';
import Box from "proximity/components/Box.js";
import TutorialCard from '../components/TutorialCard';
import GIF from 'proximity/images/foss.gif'; // Make sure this path is correct




export default function HomeScreen() {



    return (
        <ImageBackground source={GIF} style={{ width: "100%", height: "100%" }}>

            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <Text style={styles.header}> Welcome to proximity </Text>

                    <View style={styles.tutBox}>
                        <Text style={styles.tutText}>Below you will find a quick tutorial</Text>
                    </View>

                    <TutorialCard number="1"></TutorialCard>
                    <TutorialCard number="2"></TutorialCard>
                    <TutorialCard number="3"></TutorialCard>
                    <TutorialCard number="4"></TutorialCard>




                </View>
            </ScrollView>

        </ImageBackground>



    );
}

const styles = StyleSheet.create({
    scroll: {
        width: "100%",

    },
    header: {
        fontSize: 40,
        fontFamily: "Impact",
        color: "white",
        marginBottom: -10
    },
    container: {
        padding: 20,
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



