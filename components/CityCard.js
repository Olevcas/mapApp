import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Linking, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


// Additional component for extended card
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
        <View style={style.extendedCardContainer}>
            <Text style={style.extendedHeaderText}>{cityName}</Text>
            <Text style={style.extendedText}>
                Check out the wikipediapage of {cityName}:
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
                        height: 400
                    }}
                    source={{ uri: imageUrl }}
                />
            </View>
            <TouchableOpacity onPress={onClose}>
                <Text style={style.closeButton}>Close</Text>
            </TouchableOpacity>
        </View>
    );
}


function CityCard(props) {

    const [extended, setExtended] = useState(false);

    const toggleExtended = () => {
        setExtended(!extended);
    };

    const cityName = props.cityName;
    const population = props.population;
    const distance = props.distance;
    const cityLat = parseFloat(props.cityLat);
    const cityLng = parseFloat(props.cityLng);


    return (

        <View style={style.container}>
            <View style={style.cardbox}>
                <Text style={style.header}>{cityName}</Text>
                <Text style={style.texts}>Population: {population}</Text>
                <Text style={style.texts}>Distance: {distance} km</Text>
                <TouchableOpacity onPress={toggleExtended}>
                    <Text style={style.moreInfoButton}>More Info</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={extended}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setExtended(false)}
            >
                <ExtendedCityCard
                    cityName={cityName}
                    cityLat={cityLat}
                    cityLng={cityLng}
                    wikipediaPage={'https://en.wikipedia.org/wiki/' + cityName + ''}
                    onClose={() => setExtended(false)}
                />
            </Modal>
        </View>

    );
}

export default CityCard;

const style = StyleSheet.create({
    cardbox: {
        width: "100%",
        justifyContent: "center",
        overflow: 'hidden',
        padding: 15,
        gap: 15,
        elevation: 12,
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 8
    },
    texts: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2b2b2b"

    },
    container: {
        width: "100%",
        opacity: 0.8,
        /*shadowColor: "black",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6.49,

        elevation: 12, */
        alignItems: "center",
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#2b2b2b"
    },
    moreInfoButton: {
        fontSize: 18,
        color: 'blue',
        marginLeft: 'auto', // Add this line
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },

    // Additional styles for the extended card
    extendedCardContainer: {
        width: '80%', // Adjust this to the desired width for extended cards
        height: '85%', // Adjust this to the desired height for extended cards
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 'auto', // Center the box horizontally
        marginRight: 'auto', // Center the box horizontally
        margin: 'auto', // Center the box horizontally
        marginTop: 'auto', // Center the box vertically
        marginBottom: 'auto', // Center the box vertically
        borderRadius: 8,
        padding: 10, // Adjust the padding as needed
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
        width: '50%',
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