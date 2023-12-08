import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';


function TutorialCard(props) {

    const number = props.number;

    return (
        <View style={styles.container}>
            <View style={styles.numberBox}>
                <Text style={styles.numberText}>{number}</Text>
            </View>
        </View>
    );
}

export default TutorialCard;

const styles = StyleSheet.create({

    container: {
        width: "100%",
        height: 250,
        backgroundColor: "white",
        opacity: 0.8,
        borderRadius: 8,
        padding: 5,
    },
    numberBox: {
        width: 60,
        height: 60,
        backgroundColor: "seagreen",
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberText: {
        fontSize: 40,
        color: "white"
    }
});