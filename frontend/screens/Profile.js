import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { bootstrap } from '../assets/css/bootstrap'
import TextBox from '../components/TextBox'
import { GetValidation } from '../function/GetValidation'
import useFetch from '../function/GetAPI'
import { useDispatch, useSelector } from "react-redux";


export default function Settings() {

    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);

    const ctlAttribute = useRef();

    const validate = GetValidation();
    const appState = useSelector((state) => state.appstate.login_info);
    const dispatch = useDispatch();
    function initiControl() {
        const ctl_array = [
            {
                /*Ctl:User name : 0*/
                arrayindex: 0,
                theme: {
                    placeholder: "User name",
                    id: "txt_username",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: true,
                    sethint: false,
                    hinttext: "Enter your Username",
                },
                inputvalue: appState.userName,
                validate: {
                    mandatory: true,
                    datatype: "username",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:Email : 1*/
                arrayindex: 1,
                theme: {
                    placeholder: "Email",
                    id: "txt_email",
                    inputtype: "email-address",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: true,
                    sethint: false,
                    hinttext: "Enter your Email",
                },
                inputvalue: appState.mailID,
                validate: {
                    mandatory: true,
                    datatype: "email",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:Phone no : 2*/
                arrayindex: 2,
                theme: {
                    placeholder: "Phone no",
                    id: "txt_email",
                    inputtype: "numeric",
                    length: 10,
                    isfocus: "",
                    securetext: false,
                    readonly: true,
                    sethint: false,
                    hinttext: "Enter your phone no",
                },
                inputvalue: appState.phone,
                validate: {
                    mandatory: true,
                    datatype: "phoneno",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:User type : 3*/
                arrayindex: 3,
                theme: {
                    placeholder: "User type",
                    id: "txt_usertype",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: true,
                    sethint: false,
                    hinttext: "Enter your User type",
                },
                inputvalue: appState.userType,
                validate: {
                    mandatory: true,
                    datatype: "phoneno",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:password : 4*/
                arrayindex: 4,
                theme: {
                    placeholder: "Password",
                    id: "txt_password",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: true,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Password",
                },
                inputvalue: "",
                validate: {
                    mandatory: true,
                    datatype: "Default",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:Confirm password : 5*/
                arrayindex: 5,
                theme: {
                    placeholder: "Confirm Password",
                    id: "txt_password",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: true,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Confirm Password",
                },
                inputvalue: "",
                validate: {
                    mandatory: true,
                    datatype: "Default",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                //ctl : Done : 6
                arrayindex: 6,
                theme: {
                    id: "done",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgSuccessLight, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                    disable: false,
                    labelText: "Done",
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
                //ctl : Reset : 7
                arrayindex: 7,
                theme: {
                    id: "reset",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgDangerLight, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                    disable: false,
                    labelText: "Reset",
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
                //ctl : back : 8
                arrayindex: 8,
                theme: {
                    id: "back",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgWhite, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                    disable: false,
                    labelText: "Back",
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
                /*Ctl:ID : 9*/
                arrayindex: 9,
                theme: {
                    placeholder: "ID",
                    id: "txt_password",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: true,
                    sethint: false,
                    hinttext: "Enter your ID",
                },
                inputvalue: appState._id,
                validate: {
                    mandatory: true,
                    datatype: "Default",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
        ]

        ctlAttribute.current = ctl_array;
        setStartInit(false);
        setStartRender(true);
    }

    useEffect(() => {
        if (startInit == true) {
            initiControl();
        }
    }, [startInit])

    return (
        <>
            {startRender &&
                < View style={{ flex: 1, backgroundColor: "#01050D" }}>
                    <Text style={{ fontSize: 33, margin: 10, fontWeight: 500, color: "white" }}>My profile</Text>
                    <View style={{ marginTop: 0 }} >
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[9]}
                        />
                    </View>
                    <View  >
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
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[3]}
                        />
                    </View>


                </View >
            }
        </>
    )
}