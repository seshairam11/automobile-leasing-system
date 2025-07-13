import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { bootstrap } from '../assets/css/bootstrap'
import TextBox from '../components/TextBox';
import LocalButton from '../components/LocalButton';
import { useSelector } from 'react-redux';
import json from "../env.json"
import { io } from "socket.io-client";

export default function TrackVehicle() {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [rerender, setRerender] = useState(false);

    const socketUrl = "https://automobile-leasing-system.onrender.com"
    const socketRef = useRef(null);

    const appState = useSelector((state) => state.appstate.login_info);

    const ctlAttribute = useRef();
    function initiControl() {
        const ctl_array = [
            {
                /*Ctl:User ID : 0*/
                arrayindex: 0,
                theme: {
                    placeholder: "User ID",
                    id: "txt_userid",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your User ID",
                },
                inputvalue: "",
                validate: {
                    mandatory: true,
                    datatype: "default",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:Vehicle Name : 1*/
                arrayindex: 1,
                theme: {
                    placeholder: "Vehicle Name",
                    id: "txt_userid",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Vehicle Name",
                },
                inputvalue: "",
                validate: {
                    mandatory: true,
                    datatype: "default",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:Vehicle No : 2*/
                arrayindex: 2,
                theme: {
                    placeholder: "Vehicle No",
                    id: "txt_userid",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Vehicle No",
                },
                inputvalue: "",
                validate: {
                    mandatory: true,
                    datatype: "default",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                //ctl : Track Renter : 3
                arrayindex: 3,
                theme: {
                    id: "track-renter",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "#B6F25C", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
                    disable: false,
                    labelText: "Track Renter",
                    labelTextStyle: [{ color: "black", fontWeight: 700, fontSize: 15 }]
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
        setStartInit(false);
        setStartRender(true);
    }
    function handlePress(id) {
        switch (id) {
            case "track-renter":
                fnTrackRenter();
                break;
        }
    }
    function fnTrackRenter() {
        let receiver = ctlAttribute.current[0].inputvalue;
        let vehicleName = ctlAttribute.current[1].inputvalue;
        let vehicleNo = ctlAttribute.current[2].inputvalue;
        let sender = appState._id;
        let provider = appState.userName;
        let activeSts = false;
        socketRef.current.emit("requesttracking", ({ sender, receiver, provider, vehicleName, vehicleNo, activeSts }))
        ctlAttribute.current[0].inputvalue = ""
        ctlAttribute.current[1].inputvalue = ""
        ctlAttribute.current[2].inputvalue = ""
        setRerender(render => !render);
    }

    useEffect(() => {
        if (startInit == true) {
            initiControl();
        }
    }, [startInit])

    useEffect(() => {
        try {
            socketRef.current = io(socketUrl, {
                transports: ["websocket"], // Ensures WebSocket connection for React Native
            });

            return () => {
                if (socketRef.current) {
                    socketRef.current.disconnect();
                }
            };
        } catch (error) {
            console.error("Error fetching live location:", error);
        }
    }, [])
    return (
        <>
            {startRender &&
                < View style={{ flex: 1, backgroundColor: "#01050D" }}>
                    <Text style={{ fontSize: 33, margin: 10, fontWeight: 500, color: "white" }}>Track Vehicle</Text>
                    <View>
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[0]}
                        />
                    </View>
                    <View>
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[1]}
                        />
                    </View>
                    <View>
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[2]}
                        />
                    </View>
                    <View  >
                        <LocalButton
                            handlePress={handlePress}
                            ctl_Attribute={ctlAttribute.current[3]}
                        />
                    </View>
                </View>
            }
        </>

    )
}

