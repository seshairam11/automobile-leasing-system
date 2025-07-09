import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View } from 'react-native';
import React, { useState } from 'react';

export default function GooglePlaceAutoComplete({ placeholder, getQuadientes }) {
    const GOOGLE_MAPS_APIKEY = "AIzaSyAZ3i-HgExMuPw92_Ovn2bX03YkGvyKg4E"
    const [inputText, setInputText] = useState("");

    function handleOnPress(data, details) {
        getQuadientes(details.geometry.location)
    }
    return (
        <View style={{ height: "100%", maxHeight: "50%", padding: 10 }}>
            <GooglePlacesAutocomplete
                placeholder={placeholder}
                onPress={(data, details) => {
                    handleOnPress(data, details);
                }}

                fetchDetails={true} // Ensures details like lat/lng are fetched
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: "en",
                    components: "country:IN"
                }}
                debounce={300} // Delay search to optimize API calls
                enablePoweredByContainer={false} // Hides "Powered by Google"
                styles={{
                    textInput: {
                        height: 50,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        fontSize: 16,
                    },
                    listView: {
                        backgroundColor: "white",
                        height: "100%",
                        zIndex: 20
                    },
                    textInputContainer: { width: "100%" },
                }}
            />
        </View>
    );
}
