import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


function Box(props) {

    const height = props.height;

    const style = StyleSheet.create({
        mapbox: {
            width: '80%',
            height: height,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: '#000',
            backgroundColor: "white",
        }

    });

    return (
        <View style={style.mapbox}></View>
    )
}
export default Box;

