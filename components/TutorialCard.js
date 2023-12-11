import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';


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
            <View style={styles.videoBox}>
                <Video
                    style={styles.video}
                    source={path}
                    useNativeControls
                    isLooping
                ></Video>
            </View>
        </View>
    );
}

export default TutorialCard;

const styles = StyleSheet.create({

    video: {
        height: "100%",
    },
    videoBox: {
        width: "60%",
        height: "65%",
        borderColor: "seagreen",
        borderWidth: 3,
        borderRadius: 5,
        alignSelf: "center"
    },
    boxText: {
        fontSize: 18,
    },
    textWrapper: {
        justifyContent: "center",
        width: 300,
    },
    numberAndText: {
        flexDirection: "row",
        marginBottom: 10,
        gap: 15,
        width: "100%",
    },
    container: {
        width: "100%",
        height: 260,
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