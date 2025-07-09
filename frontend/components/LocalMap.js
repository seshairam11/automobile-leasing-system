import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, UrlTile, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';

const LocalMap = () => {
  const [routeCoords, setRouteCoords] = useState([]);
  const GOOGLE_MAPS_APIKEY = "AIzaSyAZ3i-HgExMuPw92_Ovn2bX03YkGvyKg4E"

  const pickupCords = {
    latitude: 13.0827, // Chennai
    longitude: 80.2707,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  const droplocationCords = {
    latitude: 13.5597, // Tada
    longitude: 79.6841,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  const mapRef = useRef();

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        initialRegion={pickupCords}
        showsUserLocation
      >
        <Marker
          coordinate={pickupCords}
        />
        <Marker
          coordinate={droplocationCords}
        />
        <MapViewDirections
          origin={pickupCords}
          destination={droplocationCords}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="#9c95f9"
          optimizeWaypoints={false}
          onReady={result => {
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                left: 30,
                bottom: 100,
                top: 100
              }
            })
          }}
        />
      </MapView>

      {/* Title Overlay */}
      <Text
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          fontSize: 16,
          fontWeight: "bold",
          color: "black",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: 5,
          borderRadius: 5,
        }}
      >
        Chennai to Tada - OpenStreetMap Route
      </Text>
    </View>
  );
};

export default LocalMap;
