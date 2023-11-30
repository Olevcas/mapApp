import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


class Box extends React.Component {
    render() {
        return (

            <View style={style.mapbox}></View>

        );
    }
}
export default Box;

const style = StyleSheet.create({
    mapbox: {
        width: '80%',
        height: '70%',
        borderRadius: 10,
        borderWidth: 4,
        borderColor: '#000',
        justifyContent: "center",
        backgroundColor: "lightgreen",
        overflow: 'hidden'
    }

});