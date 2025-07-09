import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { bootstrap } from '../assets/css/bootstrap'
import TextBox from '../components/TextBox';
import LocalButton from '../components/LocalButton';
import { Provider, useSelector } from 'react-redux';
import json from "../env.json"
import { io } from "socket.io-client";
import useFetch from '../function/GetAPI';
import { startLiveTracking } from "../function/GetCurrentLocation";


export default function DeleteTracking() {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [rerender, setRerender] = useState(false);

    const socketUrl = `http://${json.ipAddress}:8000`
    const socketRef = useRef(null);
    const ctlAttribute = useRef([])

    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
    const appState = useSelector((state) => state.appstate.login_info);

    function fnListRequestTracking() {
        let _getBody = {
            _id: appState._id,
        }
        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/liststatustracking",
            apikey: "LISTREQUEST"
        };
        serverRequest(serverRequestParam);
        setStartInit(false);
    }


    function initiControl() {
        if (responseData.isAuth) {
            ctlAttribute.current = responseData.value;
            setStartRender(true);
        }
    }

    useEffect(() => {
        if (startInit == true) {
            fnListRequestTracking();
        } else {
            if (isLoadingApi) {
                switch (apiKey) {
                    case "LISTREQUEST":
                        initiControl();
                        break;
                    case "DELETEREQUEST":
                        fnResponseDelete();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi])

    function fnResponseDelete() {
        const filteredData = ctlAttribute.current.filter(item => item._id != responseData.value)
        ctlAttribute.current = filteredData;
        setRerender(prev => !prev)
    }
    useEffect(() => {
        try {
            socketRef.current = io(socketUrl, {
                transports: ["websocket"], // Ensures WebSocket connection for React Native
            });
            if (socketRef.current) {
                const requestid = `${appState._id}_request`
                console.log(requestid)
                socketRef.current.on(requestid, (data) => {
                    ctlAttribute.current.push(data)
                    setRerender(perv => !perv)
                });
                const responseid = `${appState._id}_response`
                socketRef.current.on(responseid, (data) => {
                    const filteredData = ctlAttribute.current.filter(item => item._id != data._id)
                    ctlAttribute.current = [data, ...filteredData];
                    setRerender(prev => !prev)
                });
            }

            return () => {
                if (socketRef.current) {
                    socketRef.current.disconnect();
                }
            };
        } catch (error) {
            console.error("Error fetching live location : ", error);
        }
    }, [])

    function fnOnPressButtons(id, sts) {
        const filteredData = ctlAttribute.current.filter(item => item._id == id)[0]
        if (Object.keys(filteredData).length !== 0) {
            switch (sts) {
                case "accept":
                    fnAccept(filteredData);
                    break;
                case "delete":
                    fnDelete(filteredData);
                    break;
            }
        }
    }
    function fnDelete(obj) {
        let _getBody = {
            _id: obj._id,
        }
        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/deleterequesttracking",
            apikey: "DELETEREQUEST"
        };
        serverRequest(serverRequestParam);
    }
    async function fnAccept(obj) {
        const currentLocation = await handleStartTracking();
        const _id = obj._id
        const lat = currentLocation.latitude;
        const long = currentLocation.longitude;
        const activeSts = true;

        socketRef.current.emit('responsetracking', _id, lat, long, activeSts)
    }
    const handleStartTracking = async () => {

        try {
            const coords = await startLiveTracking();
            return coords;
        } catch (error) {
            console.error("Tracking error:", error);
        }
    };
    return (
        <>
            {startRender &&
                < View style={{ flex: 1, backgroundColor: "#01050D" }}>
                    <Text style={{ fontSize: 33, margin: 10, fontWeight: 500, color: "white" }}>Reqest Tracking</Text>
                    <View style={{ display: "flex", flexDirection: "column", padding: 10 }}>
                        {
                            ctlAttribute.current.map((item, index) => {
                                return (
                                    <View key={index} style={{ width: "100%", padding: 5, borderBottomWidth: 1, borderColor: "#B6F25C", display: "flex", flexDirection: "row" }}>
                                        <View style={{ display: "flex", flexDirection: "row", width: "70%" }}>
                                            <View>
                                                <Image source={require('../assets/img/roadvehicle.png')} style={{ height: 70, width: 70, resizeMode: 'contain', margin: 10 }} />
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "column" }}>
                                                <Text style={{ color: "white", fontSize: 30, marginLeft: 10, marginTop: 10, fontWeight: 700, marginBottom: 7 }}>{item.provider.charAt(0).toUpperCase() + item.provider.slice(1).toLowerCase()}</Text>
                                                <View style={{ display: "flex", flexDirection: "row" }}>
                                                    <View style={{ display: "flex", flexDirection: "row", marginLeft: 10, }}>
                                                        <Image source={require('../assets/img/vehicle.png')} style={{ height: 18, width: 18, borderRadius: 10, resizeMode: 'contain', marginVertical: "auto", backgroundColor: "white" }} />
                                                        <Text style={{ color: "white", marginLeft: 5, fontSize: 12 }}>{item.vehicleName}</Text>
                                                    </View>
                                                    <View style={{ display: "flex", flexDirection: "row", marginLeft: 10, }}>
                                                        <Image source={require('../assets/img/TN.png')} style={{ height: 18, width: 18, borderRadius: 5, borderWidth: 1, borderColor: "white", resizeMode: 'contain', marginVertical: "auto", backgroundColor: "white" }} />
                                                        <Text style={{ color: "white", marginLeft: 5, fontSize: 12 }}>{item.vehicleNo}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>


                                        <View style={{ display: "flex", flexDirection: "row", width: "30%", justifyContent: "center", marginLeft: 10, marginTop: 13, gap: 10 }} >
                                            <TouchableOpacity
                                                style={{ backgroundColor: "white", padding: 5, height: 55, width: 55, marginTop: 12, borderRadius: 10 }}
                                                onPress={() => fnOnPressButtons(item._id, "delete")}
                                            >
                                                <Image source={require('../assets/img/trash.png')} style={{ height: 40, width: 40, resizeMode: 'contain', marginVertical: "auto", marginLeft: 3 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View >
            }
        </>

    )
}