import React from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView, Image } from 'react-native';
import TutorialCard from '../components/TutorialCard';
import GIF from 'proximity/images/foss.gif'; // Make sure this path is correct
import logo2 from "proximity/images/prox.png";


export default function HomeScreen() {

    return (
        <ImageBackground source={GIF} style={{ width: "100%", height: "100%" }}>


            <View style={styles.container}>
                <View style={styles.headerLogo}>
                    <Image resizeMode="contain" source={logo2} style={styles.logo}></Image>
                    {/*<Text style={styles.header}> Welcome to proximity </Text>*/}
                </View>
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
    logo: {
        height: 120,
        width: "100%"
    },
    headerLogo: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 0,
        marginTop: -5

    },
    scroll: {
        width: "100%",
        paddingHorizontal: 20,
        marginTop: -10
    },
    container: {
        marginTop: "10%",
        paddingTop: 10,
        flex: 1,
        alignItems: "center",
        gap: 20,

    },
    tutText: {
        fontSize: 17,
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



