import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Linking, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { BlurView } from 'expo-blur';


function ExtendedCityCard({ cityName, cityLat, cityLng, wikipediaPage, onClose }) {
    const setRegion = {
        latitude: cityLat,
        longitude: cityLng,
        latitudeDelta: 0.2222,
        longitudeDelta: 0.2221,
    };

    const [imageUrl, setImageUrl] = useState(null);

    // Fetch the image from Wikipedia
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    'https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=' + cityName + ''
                );
                const data = await response.json();
                // Extract the image URL from the API response
                const page = data.query.pages[0];
                const imageSource = page?.original?.source;

                setImageUrl(imageSource);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, []);

    return (
        <BlurView intensity={40} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            <View style={style.extendedCardContainer}>
                <Text style={style.extendedHeaderText}>{cityName}</Text>
                <Text style={style.extendedText}>
                    Check out it's wikipedia page:
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL(wikipediaPage)}>
                    <Text style={style.extendedWikipediaButton}>{wikipediaPage}</Text>
                </TouchableOpacity>
                <MapView style={style.extendedMap} initialRegion={setRegion} >
                    <Marker
                        coordinate={{
                            latitude: cityLat,
                            longitude: cityLng,
                        }}
                        title={cityName}
                    />
                </MapView>
                <View style={style.imageContainer}>
                    <Image
                        style={{
                            width: '100%',
                            height: 200
                        }}
                        source={{ uri: imageUrl }}
                    />
                </View>
                <TouchableOpacity onPress={onClose}>
                    <Text style={style.closeButton}>Close</Text>
                </TouchableOpacity>
            </View>
        </BlurView >
    );
}
export default ExtendedCityCard;

const style = StyleSheet.create({
    // Additional styles for the extended card
    extendedCardContainer: {
        width: '85%', // Adjust this to the desired width for extended cards
        height: '70%', // Adjust this to the desired height for extended cards
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 'auto', // Center the box horizontally
        marginRight: 'auto', // Center the box horizontally
        margin: 'auto', // Center the box horizontally
        marginTop: 'auto', // Center the box vertically
        marginBottom: 'auto', // Center the box vertically
        borderRadius: 8,
        padding: 20, // Adjust the padding as needed
        elevation: 12,

    },
    extendedHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2b2b2b',

    },
    extendedText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2b2b2b',
        marginTop: 10,
    },
    extendedWikipediaButton: {
        fontSize: 18,
        color: 'blue',
        marginTop: 20,
    },
    closeButton: {
        fontSize: 18,
        color: 'blue',
        marginTop: 20,
    },
    extendedMap: {
        width: '60%',
        height: '30%',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },

});
