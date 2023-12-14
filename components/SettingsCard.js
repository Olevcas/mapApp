import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

function SettingsCard(props) {

    const handleConfirmButtonPress = props.handleConfirmButtonPress;
    const updateRange = props.updateRange; // Get the function to update range
    const [range, setRange] = useState(0);


    const handleSliderChange = (value) => {
        setRange(parseInt(value));
    };
    const handleSliderCompleted = (value) => {
        updateRange(parseInt(value)); // Call the function to update range in MapPage
    };

    return (

        <View style={styles.card}>
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#2b2b2b", opacity: 0.95 }}>Choose your radius</Text>
            <Slider onValueChange={handleSliderChange} onSlidingComplete={handleSliderCompleted} tapToSeek={true} style={{ width: '90%', height: 60 }} minimumValue={0} maximumValue={1250} step={20} value={range} minimumTrackTintColor="seagreen" maximumTrackTintColor="seagreen" />
            <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: "-2%", marginBottom: "2%", color: "#2b2b2b", opacity: 0.95 }}>{range + " km"}</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmButtonPress} ><Text style={styles.confirmText}>Confirm radius</Text></TouchableOpacity>
        </View>

    )
}
export default SettingsCard;

const styles = StyleSheet.create({
    card: {
        width: "90%",
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position: "absolute",
        borderRadius: 15,
        zIndex: 100,
        alignSelf: 'center',
        top: "40%",
        alignItems: 'center',
        justifyContent: "center",
        paddingVertical: 25,
        gap: 15,
    },
    confirmButton: {
        fontSize: 20,
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "seagreen",
        backgroundColor: "seagreen",
        padding: 3,
        overflow: "hidden",
        width: "50%",
        height: "25%",
        alignItems: "center",
        justifyContent: "center"

    },
    confirmText: {
        color: "white",
        fontSize: 25
    }
});



