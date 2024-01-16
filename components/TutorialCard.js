import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';




function TutorialCard(props) {

    const number = props.number;
    const header = props.header;
    const path = props.path;

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
            <Image
                source={path}
                style={styles.imageStyle}

            ></Image>

        </View>
    );
}

export default TutorialCard;

const styles = StyleSheet.create({


    imageStyle: {
        width: "100%",
        height: undefined,
        aspectRatio: 1.5, // Adjust this based on your image's aspect ratio
        borderColor: "seagreen",
        borderWidth: 3,
        borderRadius: 5,
    },
    boxText: {
        fontSize: 18,
    },
    textWrapper: {
        justifyContent: "center",
        width: "80%",
    },
    numberAndText: {
        flexDirection: "row",
        marginBottom: 10,
        paddingRight: 10,
        gap: 11,
        width: "100%",
    },
    container: {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
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