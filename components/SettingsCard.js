import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

function SettingsCard(props) {

    const handleConfirmButtonPress = props.handleConfirmButtonPress;
    const updateRange = props.updateRange; // Get the function to update range
    const [range, setRange] = useState(0);


    const handleSliderChange = (value) => {
        setRange(parseInt(value));
        updateRange(parseInt(value)); // Call the function to update range in MapPage
    };


    return (

        <View style={styles.card}>
            <Text style={{ fontSize: 20 }}>Choose your distance</Text>
            <Slider onValueChange={handleSliderChange} style={{ width: '90%', height: 60 }} minimumValue={0} maximumValue={1250} step={20} value={range} minimumTrackTintColor="white" maximumTrackTintColor="white" />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{range + " km"}</Text>
            <Text style={styles.confirmButton} onPress={handleConfirmButtonPress}>Confirm radius</Text>
        </View>

    )
}
export default SettingsCard;

const styles = StyleSheet.create({
    sliderbox: {
        backgroundColor: "red",
        width: "100%",
        height: "60%"
    },

    card: {
        width: "90%",
        backgroundColor: "lightblue",
        position: "absolute",
        borderRadius: 15,
        zIndex: 100,
        alignSelf: 'center',
        top: "30%",
        opacity: 1,
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        gap: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.77,
        shadowRadius: 12.49,

        elevation: 12,
    },
    confirmButton: {
        fontSize: 20,
        alignItems: 'center',
        textAlign: "center",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "white",
        backgroundColor: "white",
        padding: 3,
        overflow: "hidden"
    }
});



