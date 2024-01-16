import React from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView, Image } from 'react-native';
import TutorialCard from '../components/TutorialCard';
import GIF from 'proximity/images/foss.gif'; // Make sure this path is correct
import logo2 from "proximity/images/prox.png";
import { Video, ResizeMode } from 'expo-av';

export default function HomeScreen() {

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});



    return (
        <ImageBackground source={GIF} style={{ width: "100%", height: "100%" }}>


            <View style={styles.container}>

                <View style={styles.headerLogo}>
                    <Image resizeMode="contain" source={logo2} style={styles.logo}></Image>
                </View>

                <View style={styles.tutBox}>
                    <Text style={styles.tutText}>Below you will find a quick tutorial</Text>
                </View>

                <ScrollView style={styles.scroll}>
                    <TutorialCard number="1" header="Navigate to the Map Page to start filtering cities:" path={require("../images/tutimages/tut1.jpeg")}></TutorialCard>
                    <TutorialCard number="2" header="Press the 'Show menu' button and set a radius:" path={require("../images/tutimages/tut2.jpeg")}></TutorialCard>
                    <TutorialCard number="3" header="Confirm the radius, and let the map show the relevant cities:" path={require("../images/tutimages/tut3.jpeg")}></TutorialCard>
                    <TutorialCard number="4" header="To get a list view of the cities, head over to the City List page:" path={require("../images/tutimages/tut4.jpeg")}></TutorialCard>
                    <TutorialCard number="5" header="Filter based on population, distance, or even search:" path={require("../images/tutimages/tut5.jpeg")}></TutorialCard>

                    <View style={styles.credz}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>Made by:</Text>
                        <Text style={{ fontWeight: 600 }}>Henrik Bang-Olsen</Text>
                        <Text style={{ fontWeight: 600 }}>Ole Evjen-Caspersen</Text>
                    </View>

                </ScrollView>



            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    credz: {
        alignItems: "center",
        width: "100%",
        borderRadius: 8,
        backgroundColor: "white",
        opacity: 0.8,
        gap: 3,
        padding: 7,
        marginBottom: 20

    },
    video: {
        width: 200,
        height: 200
    },
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
        paddingHorizontal: 40,
        marginTop: -10,
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



