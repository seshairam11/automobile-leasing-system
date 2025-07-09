import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import LocalButton from "../components/LocalButton"
import { mapStyle } from "../assets/css/mapStyle"
import { bootstrap } from "../assets/css/bootstrap"
import { startLiveTracking } from "../function/GetCurrentLocation";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import * as Clipboard from "expo-clipboard";
import ErrorComponent from "../components/ErrorComponent";
import json from "../env.json"
import useFetch from "../function/GetAPI";
import { Picker } from "@react-native-picker/picker";
import GetIOT from "../function/GetIOT";
import email from 'react-native-email';
const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#1d2c4d" }]
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#8ec3b9" }]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1a3646" }]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#64779e" }]
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b6878" }]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [{ color: "#334e87" }]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#023e58" }]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#283d6a" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6f9ba5" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#023e58" }]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3C7680" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#304a7d" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#98a5be" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#2c6675" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#b0d5ce" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#023e58" }]
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ color: "#98a5be" }]
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1d2c4d" }]
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [{ color: "#283d6a" }]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{ color: "#3a4762" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4e6d70" }]
  }
];



const MapScreen = ({ navigation, route }) => {
  const [routeCoords, setRouteCoords] = useState({
    pickupCords: {},
    droplocationCords: {}
  });
  const { pickupCords, droplocationCords } = routeCoords;
  const [startInit, setStartInit] = useState(true);
  const [startRender, setStartRender] = useState(false);
  const [driverid, setDriverid] = useState("");
  const [error, setError] = useState({});
  const [marker, setMarker] = useState([]);
  const [renterLocation, setRenterLocation] = useState([]);
  const [render, setRender] = useState([]);

  const socketUrl = `http://${json.ipAddress}:8000`
  const socketRef = useRef(null);
  const mapRef = useRef();
  const currentLocationRef = useRef();
  const ctlAttribute = useRef();
  const findRenter = useRef([]);
  const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
  const { responseInfo, isLoadingIot, IotRequest } = GetIOT();

  const appState = useSelector((state) => state.appstate.login_info);


  const chennaiCords = {
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5
  }
  function fnListMarkerRequest() {
    let _getBody = {
      referId: appState._id,
    }
    let serverRequestParam = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(_getBody),
      apiUrl: `/api/v1/${appState.userType == "Provider" ? "listlocation" : "alllocation"}`,
      apikey: "LISTMARKER"
    };
    serverRequest(serverRequestParam);
    setStartInit(false);
  }
  function initiControl() {
    if (appState.userType == "Renter") {
      const loopedData = responseData.value.map((item) => (
        {
          _id: item._id,
          locationName: item.locationName,
          coords: {
            latitude: item.lat,
            longitude: item.long,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5
          }
        }))
      setMarker(loopedData)
    }
    if (appState.userType == "Provider") {
      console.log(responseData)
      const loopedDataRenter = responseData.renters.map((item) => ({
        _id: item._id,
        vehicleName: item.vehicleName,
        vehicleNo: item.vehicleNo,
        sender: item.sender,
        receiver: item.receiver,
        provider: item.provider,
        activeSts: item.activeSts,
        coords: {
          latitude: item.lat,
          longitude: item.long,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5
        }
      }))
      findRenter.current = loopedDataRenter;
    }

    const ctl_array = [
      {
        /*Ctl: getProviderloction : 0*/
        arrayindex: 0,
        theme: {
          id: "getProviderloction",
          style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "#B6F25C", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
          disable: false,
          labelText: "Search Location",
          labelTextStyle: [{ color: "black", fontWeight: 700, fontSize: 15 }]
        },
        icon: {
          setIcon: false,
          name: "",
          size: 0,
          color: "",
        }
      },
      {
        /*Ctl: clear location : 1*/
        arrayindex: 1,
        theme: {
          id: "claerlocation",
          style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "white", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
          disable: false,
          labelText: "Clear location",
          labelTextStyle: [{ color: "black", fontWeight: 700, fontSize: 15 }]
        },
        icon: {
          setIcon: false,
          name: "",
          size: 0,
          color: "",
        }
      },
      {
        /*Ctl: View driver location : 2*/
        arrayindex: 2,
        theme: {
          id: "viewdriver",
          style: [bootstrap.btnSm, bootstrap.btn, bootstrap.btnLight, bootstrap.noShadow, { marginTop: 20 }],
          disable: false,
          labelText: "View driver location",
          labelTextStyle: [bootstrap.textDark]
        },
        icon: {
          setIcon: false,
          name: "",
          size: 0,
          color: "",
        }
      },
      {
        /*Ctl: Search Driver : 3*/
        arrayindex: 3,
        theme: {
          id: "searchdriver",
          style: [bootstrap.btnSm, bootstrap.btn, bootstrap.btnLight, bootstrap.noShadow, { marginTop: 20 }],
          disable: false,
          labelText: "Search Driver",
          labelTextStyle: [bootstrap.textDark]
        },
        icon: {
          setIcon: false,
          name: "",
          size: 0,
          color: "",
        }
      },
    ]
    ctlAttribute.current = ctl_array;

    let _getBody = {
      providerID: appState._id,
    }
    let iotRequestParam = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(_getBody),
    };
    IotRequest(iotRequestParam);
    setStartRender(true);

  }
  function fnCallingIot() {
    console.log("Running")
    console.log(responseInfo)
    if (responseInfo.activeSts) {
      const mappedData = {
        _id: responseInfo._id,
        vehicleName: responseInfo.vehicleName,
        vehicleNo: responseInfo.vehicleNo,
        provider: responseInfo.provider,
        activeSts: responseInfo.activeSts,
        coords: {
          latitude: Number(responseInfo.lat),
          longitude: Number(responseInfo.long),
          latitudeDelta: 0.5,
          longitudeDelta: 0.5
        }
      }
      findRenter.current.push(mappedData);
      console.log(findRenter.current)
      setRender(!render);
    }
  }
  function handleOnChangePicker(id) {
    console.log(id)
    const filteredData = findRenter.current.filter(item => item._id == id)
    console.log(filteredData)
    setRenterLocation(filteredData)
  }
  function handlePress(id) {
    const btn_id = id;
    switch (btn_id) {
      case "getProviderloction":
        navigation.navigate("getProviderloction");
        break;
      case "claerlocation":
        setRouteCoords({
          pickupCords: {},
          droplocationCords: {}
        })
        break;
      case "viewdriver":
        navigation.navigate("driverlocation");
        break;
      case "searchdriver":
        navigation.navigate("driverlocation");
        break;
    }
  }
  async function copyIt(copy) {
    await Clipboard.setStringAsync(copy);
  }

  useEffect(() => {
    if (startInit == true) {
      fnListMarkerRequest()
    } else {
      if (isLoadingApi) {
        switch (apiKey) {
          case "LISTMARKER":
            initiControl();
            break;
        }
      }
    }
  }, [startInit, isLoadingApi])

  useEffect(() => {
    if (isLoadingIot) {
      fnCallingIot()
    }
  }, [isLoadingIot])

  const handleStartTracking = async () => {

    try {
      const coords = await startLiveTracking();
      currentLocationRef.current = coords
    } catch (error) {
      console.error("Tracking error:", error);
    }
  };
  async function forDriver() {
    let cords = route.params;
    // Initialize the socket connection
    socketRef.current = io(socketUrl, {
      transports: ["websocket"], // Ensures WebSocket connection for React Native
    });
    const currentLocation = await handleStartTracking(); // Wait for live tracking
    const makeCoords = {
      pickupCords: cords.pickup
        ? {
          latitude: cords.pickup.lat,
          longitude: cords.pickup.lng,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }
        : {
          latitude: currentLocationRef.current.latitude,
          longitude: currentLocationRef.current.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        },
      droplocationCords: {
        latitude: cords.drop.lat,
        longitude: cords.drop.lng,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
    }
    setRouteCoords(makeCoords);

    socketRef.current.emit("updatelocation",
      appState._id,
      makeCoords,
    );
  }
  async function forFleetOwner() {
    let id = route.params;
    // Initialize the socket connection
    socketRef.current = io(socketUrl, {
      transports: ["websocket"], // Ensures WebSocket connection for React Native
    });
    socketRef.current.emit("joinRoom", id,);
    socketRef.current.on(id, (data) => {
      ctlAttribute.current[2].theme.labelText = "Change driver"
      setDriverid(id);
      setRouteCoords(data);
    });
  }
  async function forSeller() {
    let id = route.params;
    // Initialize the socket connection
    socketRef.current = io(socketUrl, {
      transports: ["websocket"], // Ensures WebSocket connection for React Native
    });
    socketRef.current.emit("joinRoom", id,);
    socketRef.current.on(id, (data) => {
      if (Object.keys(data).length !== 0) {
        ctlAttribute.current[3].theme.labelText = "Change driver id"
        setDriverid(id);
        setRouteCoords(data);
      } else {
        setError({
          isAuth: true,
          haeder: "Error",
          body: "Driver id is invalid"
        })

      }
    });
  }

  useEffect(() => {
    const updateRoute = async () => {
      let cords = route.params;
      if (cords !== undefined) {
        try {
          switch (appState.userType) {
            case "Driver":
              const l_forDriver = await forDriver();
              break;
            case "Fleet Owner":
              const l_forFleetOwner = await forFleetOwner();
              break;
            case "Seller":
              const l_forSeller = await forSeller();
              break;
          }

          // Cleanup: Disconnect the socket on component unmount
          return () => {
            if (socketRef.current) {
              socketRef.current.disconnect();
            }
          };

        } catch (error) {
          console.error("Error fetching live location:", error);
        }
      }
    };

    updateRoute();
  }, [route]);
  return (
    <>
      {startRender && (
        <View style={{ flex: 1, position: "relative" }}>
          <View style={{ flex: 1 }}>
            <MapView
              ref={mapRef}
              customMapStyle={darkMapStyle}
              style={StyleSheet.absoluteFillObject}
              provider={PROVIDER_GOOGLE}
              initialRegion={Object.keys(pickupCords).length !== 0 ? pickupCords : chennaiCords}
              showsUserLocation={false}
            >
              {
                marker.map((item) => {
                  return (
                    <Marker key={item._id} coordinate={item.coords} anchor={{ x: 0.5, y: 0.5 }}>
                      <Image
                        source={require("../assets/office.png")}
                        style={{ width: 40, height: 40 }}
                      />
                    </Marker>
                  )
                })
              }
              {renterLocation.length !== 0 &&
                <Marker key={renterLocation[0]._id} coordinate={renterLocation[0].coords} anchor={{ x: 0.5, y: 0.5 }}>
                  <Image
                    source={require("../assets/img/roadvehicle.png")}
                    style={{ width: 40, height: 40 }}
                  />
                </Marker>
              }

            </MapView>
          </View>
          <View style={[mapStyle.bottomScreen, { position: "absolute", bottom: 0 }]}>
            {appState.userType == "Renter" &&
              <>
                <LocalButton
                  handlePress={handlePress}
                  ctl_Attribute={ctlAttribute.current[0]} />
              </>
            }
            {appState.userType == "Provider" &&
              <>
                <View
                  style={{ borderWidth: 1, borderColor: "#B6F25C", borderRadius: 30 }}
                >
                  <Picker
                    style={{ color: '#B6F25C' }}
                    dropdownIconColor="#B6F25C"
                    onValueChange={handleOnChangePicker}
                  >
                    <Picker.Item label={"--Select--"} value="000" />
                    {findRenter.current.map((item, index) => (
                      <Picker.Item key={index} label={item.vehicleName} value={item._id} />
                    ))}
                  </Picker>
                </View>

              </>
            }
          </View>
          {error.isAuth &&
            <ErrorComponent
              header={error.header}
              body={error.body}
              setError={setError}
            />}
        </View >
      )}

    </>

  );
};

export default MapScreen;
