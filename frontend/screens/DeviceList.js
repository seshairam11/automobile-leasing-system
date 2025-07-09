import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Provider, useSelector } from 'react-redux';
import useFetch from '../function/GetAPI';


export default function DeviceList() {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [rerender, setRerender] = useState(false);


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
            apiUrl: "/api/v1/listingdevice",
            apikey: "LISTREQUEST"
        };
        serverRequest(serverRequestParam);
        setStartInit(false);
    }


    function initiControl() {
        if (responseData.isAuth) {
            ctlAttribute.current = responseData.value;
            console.log(responseData.value)
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
                }
            }
        }
    }, [startInit, isLoadingApi])

    return (
        <>
            {startRender &&
                < View style={{ flex: 1, backgroundColor: "#01050D" }}>
                    <Text style={{ fontSize: 33, margin: 10, fontWeight: 500, color: "white" }}>Device List</Text>
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
                                                <Text style={{ color: "white", fontSize: 30, marginLeft: 10, marginTop: 10, fontWeight: 700, marginBottom: 7 }}>{item.deviceName.charAt(0).toUpperCase() + item.deviceName.slice(1).toLowerCase()}</Text>
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