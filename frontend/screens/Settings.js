import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import LocalButton from '../components/LocalButton'
import { bootstrap } from '../assets/css/bootstrap'
import TextBox from '../components/TextBox'
import { GetValidation } from '../function/GetValidation'
import useFetch from '../function/GetAPI'
import { useDispatch, useSelector } from "react-redux";
import { setlogininfo } from '../brewStore/AppState'
import ErrorComponent from '../components/ErrorComponent'


export default function Settings() {

    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [password, setPassword] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [error, setError] = useState({});

    const ctlAttribute = useRef();

    const validate = GetValidation();
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
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
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "#B6F25C", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
                    disable: false,
                    labelText: "Done",
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
                //ctl : Reset : 7
                arrayindex: 7,
                theme: {
                    id: "reset",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "#B6F25C", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
                    disable: false,
                    labelText: "Reset",
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
                //ctl : back : 8
                arrayindex: 8,
                theme: {
                    id: "back",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "white", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
                    disable: false,
                    labelText: "Back",
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
            case "reset":
                modifyReadOnly([0, 1, 2], false);
                setPassword(true);
                break;
            case "done":
                fnDone();
                break;
            case "back":
                makeitNormal([4, 5]);
                modifyReadOnly([0, 1, 2], true);
                setPassword(false);
                break;
        }
    }

    async function fnDone() {
        const result = await loopingValidation([0, 1, 2, 4, 5]);
        if (result) {
            if (checkPassword(4, 5) == true) {
                let _updateUserDetails = {
                    _id: appState._id,
                    userName: ctlAttribute.current[0].inputvalue,
                    mailID: ctlAttribute.current[1].inputvalue,
                    phone: ctlAttribute.current[2].inputvalue,
                    password: ctlAttribute.current[4].inputvalue,
                }
                let serverRequestParam = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(_updateUserDetails),
                    apiUrl: "/api/v1/updateuserdetails",
                    apikey: "USERDETAILS"
                };
                serverRequest(serverRequestParam);
            }
        }
    }

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
    function checkPassword(p1, p2) {
        if (ctlAttribute.current[p1].inputvalue !== ctlAttribute.current[p2].inputvalue) {
            ctlAttribute.current[p2].error.errorshow = true;
            ctlAttribute.current[p2].theme.sethint = true;
            ctlAttribute.current[p2].error.errormsg = "Password mismatch";
            setRerender(!rerender);
            return false;
        }
        return true;
    }

    function modifyReadOnly(arr, bool) {
        arr.forEach(num => {
            ctlAttribute.current[num].theme.readonly = bool;
        })
    }

    function makeitNormal(array) {
        array.map(num => {
            ctlAttribute.current[num].inputvalue = ""
            ctlAttribute.current[num].theme.sethint = false
            ctlAttribute.current[num].error.errorshow = false
        })
    }

    function fnUserDetailsResult() {
        if (responseData.isAuth) {
            modifyReadOnly([0, 1, 2], true);
            makeitNormal([4, 5]);
            dispatch(setlogininfo({
                ...appState,
                mailID: responseData.value.mailID,
                phone: responseData.value.phone,
                userName: responseData.value.userName,
            }));
            setPassword(false);
        } else {
            setError({
                isAuth: false,
                haeder: "Error",
                body: responseData.errormsg
            })
        }
    }
    useEffect(() => {
        if (startInit == true) {
            initiControl();
        } else {
            if (isLoadingApi == true) {
                switch (apiKey) {
                    case "USERDETAILS":
                        fnUserDetailsResult();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi])

    return (
        <>
            {startRender &&
                < View style={{ flex: 1, backgroundColor: "#01050D" }}>
                    <Text style={{ fontSize: 33, margin: 10, fontWeight: 500, color: "white" }}>Settings</Text>
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
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[3]}
                        />
                    </View>
                    {password &&
                        <>
                            <View >
                                <TextBox
                                    ctl_Attribute={ctlAttribute.current[4]}
                                />
                            </View>
                            <View >
                                <TextBox
                                    ctl_Attribute={ctlAttribute.current[5]}
                                />
                            </View>
                        </>
                    }
                    {password ?
                        <>

                            <View style={{ marginHorizontal: 10 }} >
                                <LocalButton
                                    handlePress={handlePress}
                                    ctl_Attribute={ctlAttribute.current[8]}
                                />
                            </View>
                            <View style={{ marginHorizontal: 10 }} >
                                <LocalButton
                                    handlePress={handlePress}
                                    ctl_Attribute={ctlAttribute.current[6]}
                                />
                            </View>
                        </>
                        :
                        <>
                            <View style={{ marginHorizontal: 10 }} >
                                <LocalButton
                                    handlePress={handlePress}
                                    ctl_Attribute={ctlAttribute.current[7]}
                                />
                            </View>
                        </>
                    }
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