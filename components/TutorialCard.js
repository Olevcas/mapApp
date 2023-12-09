import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function TutorialCard(props) {

    const number = props.number;
    const header = props.header;

    return (
        <View style={styles.container}>
            <View style={styles.numberAndText}>
                <View style={styles.numberBox}>
                    <Text style={styles.numberText}>{number}</Text>
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.boxText}>{header}</Text>
                </View>
            </View>
            <View style={styles.videoBox}></View>
        </View>
    );
}

export default TutorialCard;

const styles = StyleSheet.create({

    videoBox: {
        width: "50%",
        height: "60%",
        borderColor: "seagreen",
        borderWidth: 3,
        borderRadius: 5,
        alignSelf: "center"
    },
    boxText: {
        fontSize: 20
    },
    textWrapper: {
        alignItems: "center",
        justifyContent: "center",
        width: "80%"
    },
    numberAndText: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 15
    },
    container: {
        width: "100%",
        height: 250,
        backgroundColor: "white",
        opacity: 0.8,
        borderRadius: 8,
        padding: 10,
        marginVertical: 10
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