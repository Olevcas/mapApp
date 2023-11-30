import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Box from "proximity/components/Box.js";


export default function App() {

    return (

        <View style={styles.container}>
            <Text style={styles.text}> Dette er profilsiden </Text>
            <Box></Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightblue",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    }
});



