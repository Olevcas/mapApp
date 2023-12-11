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
                <View style={style.wikiBox}>
                    <Text style={style.extendedText}>
                        Wikipedia page:
                    </Text>
                    <TouchableOpacity onPress={() => Linking.openURL(wikipediaPage)}>
                        <Text style={style.extendedWikipediaButton}>{wikipediaPage}</Text>
                    </TouchableOpacity>
                </View>


                <View style={style.mapBox}>
                    <MapView style={style.extendedMap} initialRegion={setRegion} scrollEnabled={false} zoomEnabled={false} rotateEnabled={false} >
                        <Marker coordinate={{ latitude: cityLat, longitude: cityLng, }} title={cityName} />
                    </MapView>
                </View>

                <View style={style.imageContainer}>
                    <Image
                        style={{
                            width: '100%',
                            height: "100%"
                        }}
                        source={{ uri: imageUrl }}
                    />
                </View>
                <TouchableOpacity style={style.buttonBox} onPress={onClose}>
                    <Text style={style.closeButton}>Close</Text>
                </TouchableOpacity>
            </View>
        </BlurView >
    );
}
export default ExtendedCityCard;

const style = StyleSheet.create({
    wikiBox: {
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 15,
        height: "15%",
        borderColor: "seagreen",
        borderWidth: 3,
        backgroundColor: "white",
        width: "97%"

    },
    extendedCardContainer: {
        width: '85%', // Adjust this to the desired width for extended cards
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 4,
        borderColor: "seagreen",
        marginLeft: 'auto', // Center the box horizontally
        marginRight: 'auto', // Center the box horizontally
        margin: 'auto', // Center the box horizontally
        marginTop: 'auto', // Center the box vertically
        marginBottom: 'auto', // Center the box vertically
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingTop: 20, // Adjust the padding as needed
        height: "84%"

    },
    extendedHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2b2b2b',
        marginBottom: 20

    },
    extendedText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2b2b2b',
        textAlign: "center"
    },
    extendedWikipediaButton: {
        fontSize: 18,
        color: 'blue',
        textAlign: "center"
    },
    closeButton: {
        fontSize: 18,
        color: 'black',

    },
    buttonBox: {
        width: "30%",
        height: "5%",
        backgroundColor: "white",
        borderRadius: 5,
        borderColor: "seagreen",
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    extendedMap: {
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 10,
    },
    mapBox: {
        width: '98%',
        height: '30%',
        marginTop: 25,
        borderRadius: 8,
        borderColor: "seagreen",
        borderWidth: 3,
        overflow: "hidden"
    },
    roundContainer: {
        overflow: "hidden",
        borderRadius: 5
    },
    imageContainer: {
        width: '98%',
        height: "30%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 8,
        borderColor: "seagreen",
        borderWidth: 3,
        overflow: "hidden"


    },
});
