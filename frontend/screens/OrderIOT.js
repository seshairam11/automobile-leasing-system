import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { bootstrap } from '../assets/css/bootstrap'
import TextBox from '../components/TextBox';
import TextArea from '../components/TextArea';
import LocalButton from '../components/LocalButton';
import { useSelector } from 'react-redux';
import useFetch from '../function/GetAPI';
import { GetValidation } from '../function/GetValidation';
import ErrorComponent from '../components/ErrorComponent';
import { useNavigation } from '@react-navigation/native';

export default function OrderIOT() {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [error, setError] = useState({});

    const navigation = useNavigation();

    const ctlAttribute = useRef([])

    const validate = GetValidation();

    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
    const appState = useSelector((state) => state.appstate.login_info);

    function initiControl() {
        const ctl_array = [
            {
                /*Ctl:Device name : 0*/
                arrayindex: 0,
                theme: {
                    placeholder: "Device name",
                    id: "txt_devicename",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Device name",
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
                    id: "txt_vehiclename",
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
                /*Ctl:Vehicle no : 2*/
                arrayindex: 2,
                theme: {
                    placeholder: "Vehicle no",
                    id: "txt_vehicleno",
                    inputtype: "text",
                    length: 10,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Vehicle no",
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
                /*Ctl:Address : 3*/
                arrayindex: 3,
                theme: {
                    placeholder: "Address",
                    id: "txt_address",
                    inputtype: "text",
                    length: 100,
                    isfocus: "",
                    numberOfLines: 6,
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Vehicle no",
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
                //ctl : request Device : 4
                arrayindex: 4,
                theme: {
                    id: "requestdevice",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "#B6F25C", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
                    disable: false,
                    labelText: "Request Device",
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
                //ctl : view-device : 5
                arrayindex: 5,
                theme: {
                    id: "view-device",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "white", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
                    disable: false,
                    labelText: "View Device",
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
        const btn_id = id;
        switch (btn_id) {
            case "requestdevice":
                fnRequestDevice();
                break;
            case "view-device":
                navigation.navigate('devicelist');
                break;
        }
    }
    async function fnRequestDevice() {
        const result = await loopingValidation([0, 1, 2, 3]);
        if (result) {
            ctlAttribute.current[4].theme.disable = true
            let _getBody = {
                providerid: appState._id,
                emailID: appState.emailID,
                deviceName: ctlAttribute.current[0].inputvalue,
                vehicleName: ctlAttribute.current[1].inputvalue,
                vehicleNo: ctlAttribute.current[2].inputvalue,
                addressOnBooking: ctlAttribute.current[3].inputvalue,
            }
            let serverRequestParam = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(_getBody),
                apiUrl: `/api/v1/sendemail`,
                apikey: "SENDEMAIL"
            };
            serverRequest(serverRequestParam);
            setRerender(!rerender);
        }
    }
    function fnResponseDevice() {
        console.log(responseData)
        if (responseData.isAuth) {
            ctlAttribute.current[0].inputvalue = ""
            ctlAttribute.current[1].inputvalue = ""
            ctlAttribute.current[2].inputvalue = ""
            ctlAttribute.current[3].inputvalue = ""
        }
        ctlAttribute.current[4].theme.disable = false
        setError({
            isAuth: true,
            header: responseData.isAuth ? "Success" : "Error",
            body: responseData.message,
        })

    }
    useEffect(() => {
        if (startInit == true) {
            initiControl();
        } else {
            if (isLoadingApi) {
                switch (apiKey) {
                    case "SENDEMAIL":
                        fnResponseDevice();
                        break;

                }
            }
        }
    }, [startInit, isLoadingApi])


    async function loopingValidation(array) {
        let canFormSubmit = true;
        let l_validate = [];
        const err = await array.map(num => validate(ctlAttribute.current[num]));
        err.forEach((item, index) => {
            if (item.founderror === true) {
                canFormSubmit = false;
                ctlAttribute.current[array[index]].error.errorshow = true;
                ctlAttribute.current[array[index]].theme.sethint = true;
                ctlAttribute.current[array[index]].error.errormsg = item.errmsg;
                l_validate.push(item);
            }
        });

        if (canFormSubmit === false) {
            ctlAttribute.current[l_validate[0].arrayindex].theme.isfocus.focus();
            setRerender(!rerender);
            return false;
        }
        return true;
    }
    return (
        <>
            {startRender &&
                < View style={{ flex: 1, backgroundColor: "#01050D" }}>
                    <Text style={{ fontSize: 33, margin: 10, fontWeight: 500, color: "white" }}>Add Device</Text>
                    <View style={{ marginTop: 0 }} >
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[0]}
                        />
                    </View>
                    <View >
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[1]}
                        />
                    </View>
                    <View >
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[2]}
                        />
                    </View>
                    <View >
                        <TextArea
                            ctl_Attribute={ctlAttribute.current[3]}
                        />
                    </View>
                    <View style={{ marginTop: 100 }} >
                        <LocalButton
                            handlePress={handlePress}
                            ctl_Attribute={ctlAttribute.current[4]} />
                    </View>
                    <View>
                        <LocalButton
                            handlePress={handlePress}
                            ctl_Attribute={ctlAttribute.current[5]} />
                    </View>
                    {error.isAuth &&
                        <ErrorComponent
                            header={error.header}
                            body={error.body}
                            setError={setError}
                        />}

                </View >
            }
        </>

    )
}