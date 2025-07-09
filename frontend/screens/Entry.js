import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import LocalButton from '../components/LocalButton'
import { bootstrap } from '../assets/css/bootstrap'
import TextBox from '../components/TextBox'
import { GetValidation } from '../function/GetValidation'
import useFetch from '../function/GetAPI'
import { useDispatch, useSelector } from "react-redux";
import { setlogininfo } from '../brewStore/AppState'
import ErrorComponent from '../components/ErrorComponent'

export default function Entry({ navigation, route }) {
    const [slide, setSlide] = useState("Welcome");
    const [access, setAccess] = useState(null);
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [getError, setGetError] = useState({ isAuth: false, header: null, body: null });

    const ctlAttribute = useRef();

    const validate = GetValidation();
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
    const appState = useSelector((state) => state.appstate.login_info);
    const dispatch = useDispatch();

    function initiControl() {
        const ctl_array = [

            {
                //ctl : Renter : 0
                arrayindex: 0,
                theme: {
                    id: "Renter",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "white", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
                    disable: false,
                    labelText: "Renter",
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
                //ctl : Provider : 1
                arrayindex: 1,
                theme: {
                    id: "Provider",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "#B6F25C", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
                    disable: false,
                    labelText: "Provider",
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
                //ctl : Seller : 2
                arrayindex: 2,
                theme: {
                    id: "seller",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgSuccessLight, bootstrap.noShadow, bootstrap.mhAuto, { width: "95%", marginBottom: 20 }],
                    disable: false,
                    labelText: "Seller",
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
                //ctl : Sign in : 3
                arrayindex: 3,
                theme: {
                    id: "signin",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "white", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
                    disable: false,
                    labelText: "Sign in",
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
                //ctl : Signup : 4
                arrayindex: 4,
                theme: {
                    id: "signup",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "#B6F25C", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
                    disable: false,
                    labelText: "Sign up",
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
                /*Ctl:password : 5*/
                arrayindex: 5,
                theme: {
                    placeholder: "Login id",
                    id: "txt_loginid",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Email or Phoneno",
                },
                inputvalue: "",
                validate: {
                    mandatory: true,
                    datatype: "loginid",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:password : 6*/
                arrayindex: 6,
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
                //ctl : Sign in : 7
                arrayindex: 7,
                theme: {
                    id: "signinscreen",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "white", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
                    disable: false,
                    labelText: "Sign in",
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
                /*Ctl:User name : 8*/
                arrayindex: 8,
                theme: {
                    placeholder: "User name",
                    id: "txt_username",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Username",
                },
                inputvalue: "",
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
                /*Ctl:Email : 9*/
                arrayindex: 9,
                theme: {
                    placeholder: "Email",
                    id: "txt_email",
                    inputtype: "email-address",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Email",
                },
                inputvalue: "",
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
                /*Ctl:Phone no : 10*/
                arrayindex: 10,
                theme: {
                    placeholder: "Phone no",
                    id: "txt_email",
                    inputtype: "numeric",
                    length: 10,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your phone no",
                },
                inputvalue: "",
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
                /*Ctl:password : 11*/
                arrayindex: 11,
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
                /*Ctl:Confirm password : 12*/
                arrayindex: 12,
                theme: {
                    placeholder: "Confirm Password",
                    id: "txt_confirmpassword",
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
                //ctl : Sign in : 13
                arrayindex: 13,
                theme: {
                    id: "signupscreen",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { backgroundColor: "white", borderWidth: 2, width: "95%", marginBottom: 20, borderRadius: 30, paddingVertical: 15 }],
                    disable: false,
                    labelText: "Sign up",
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
            case "Provider":
                setSlide("Provider")
                break;
            case "Renter":
                setSlide("Renter")
                break;
            case "seller":
                setSlide("Seller")
                break;
            case "welcome":
                setSlide("Welcome")
                setAccess(null)
                break;
            case "signin":
                makeitNormal([5, 6])
                setAccess("signin")
                break;
            case "signup":
                makeitNormal([8, 9, 10, 11, 12])
                setAccess("signup")
                break;
            case "signinscreen":
                validateSigninBtn()
                break;
            case "signupscreen":
                validateSignupBtn()
                break;
        }
    }

    function makeitNormal(array) {
        array.map(num => {
            ctlAttribute.current[num].inputvalue = ""
            ctlAttribute.current[num].theme.sethint = false
            ctlAttribute.current[num].error.errorshow = false
        })
    }
    async function validateSigninBtn() {
        const result = await loopingValidation([5, 6]);
        if (result) {
            let _getSigninAuth = {
                loginID: ctlAttribute.current[5].inputvalue,
                password: ctlAttribute.current[6].inputvalue,
            }
            let serverRequestParam = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(_getSigninAuth),
                apiUrl: "/api/v1/signin",
                apikey: "SIGNIN"
            };
            serverRequest(serverRequestParam);
        }
    }

    async function validateSignupBtn() {
        const result = await loopingValidation([8, 9, 10, 11, 12]);
        if (result) {
            if (checkPassword(11, 12) == true) {
                let _getSignupAuth = {
                    userName: ctlAttribute.current[8].inputvalue,
                    mailID: ctlAttribute.current[9].inputvalue,
                    phone: ctlAttribute.current[10].inputvalue,
                    password: ctlAttribute.current[11].inputvalue,
                    userType: slide,
                }
                let serverRequestParam = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(_getSignupAuth),
                    apiUrl: "/api/v1/signup",
                    apikey: "SIGNUP"
                };
                serverRequest(serverRequestParam);
            }
        }
    }
    function fnSigninResult() {
        const _value = responseData.value
        if (responseData.isAuth === true) {
            dispatch(setlogininfo({
                ...appState,
                isAuth: responseData.isAuth,
                _id: _value._id,
                mailID: _value.mailID,
                phone: _value.phone,
                userName: _value.userName,
                userType: _value.userType,
            }));
            navigation.navigate("myprofile")
        } else {
            setGetError({
                isAuth: true,
                header: "Error",
                body: responseData.errmsg
            })
        }
    }
    function fnSignupResult() {
        const _value = responseData.value
        if (responseData.isAuth === true) {
            dispatch(setlogininfo({
                ...appState,
                isAuth: responseData.isAuth,
                _id: _value._id,
                mailID: _value.mailID,
                phone: _value.phone,
                userName: _value.userName,
                userType: _value.userType,
            }));
            navigation.navigate("myprofile")
        } else {
            setGetError({
                isAuth: true,
                header: "Error",
                body: responseData.errmsg
            })
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

    useEffect(() => {
        if (startInit == true) {
            initiControl();
        } else {
            if (isLoadingApi == true) {
                switch (apiKey) {
                    case "SIGNUP":
                        fnSignupResult();
                        break;
                    case "SIGNIN":
                        fnSigninResult();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi])

    return (
        <>
            {startRender &&
                <View style={{ position: "relative", width: "100%", height: "100%", backgroundColor: "#01050D", display: "flex", justifyContent: "center", alignContent: "center" }}>
                    <View style={access != "signup" ? { marginTop: -150 } : {}}>
                        <TouchableOpacity
                            onPress={() => handlePress("welcome")}
                        >
                            <Image
                                source={require("../assets/img/logo.jpg")}
                                style={{ width: 300, height: 150, resizeMode: "contain", marginHorizontal: "auto", marginBottom: 10 }}
                            />
                        </TouchableOpacity>
                        <View style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 35 }}>
                            <Text style={[bootstrap.h2, { color: "#B6F25C" }]}>
                                {slide == "Provider" ? "Provider" : slide == "Renter" ? "Renter" : slide == "Seller" ? "Seller" : "Welcome"}
                            </Text>
                            <Text style={{ color: "#49732C" }}>
                                {slide == "Welcome" ? "Select Your Usertype" : `Hi, ${slide == "Provider" ? "Provider" : slide == "Renter" ? "Renter" : "Seller"} Welcome to Automobile Leasing System`}

                            </Text>
                        </View>
                    </View>
                    <View>
                        {slide == "Welcome" ?
                            <>
                                <LocalButton
                                    handlePress={handlePress}
                                    ctl_Attribute={ctlAttribute.current[0]}
                                />
                                <LocalButton
                                    handlePress={handlePress}
                                    ctl_Attribute={ctlAttribute.current[1]}
                                />
                            </>
                            :
                            <>
                                {access === null ?
                                    <>
                                        <LocalButton
                                            handlePress={handlePress}
                                            ctl_Attribute={ctlAttribute.current[3]}
                                        />
                                        <LocalButton
                                            handlePress={handlePress}
                                            ctl_Attribute={ctlAttribute.current[4]}
                                        />
                                    </>
                                    : access === "signin" ?
                                        <SafeAreaView>
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[5]}
                                            />
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[6]}
                                            />
                                            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginBottom: 10 }}>
                                                <Text style={{ fontSize: 14, color: "#49732C" }}>Don't have an account yet? </Text>
                                                <TouchableOpacity onPress={() => handlePress("signup")}>
                                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#B6F25C" }}>Sign up here 🚀</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <LocalButton
                                                handlePress={handlePress}
                                                ctl_Attribute={ctlAttribute.current[7]}
                                            />
                                        </SafeAreaView>
                                        :
                                        <ScrollView>
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[8]}
                                            />
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[9]}
                                            />
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[10]}
                                            />
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[11]}
                                            />
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[12]}
                                            />
                                            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginBottom: 10 }}>
                                                <Text style={{ fontSize: 14, color: "#49732C" }}>Already have an account? </Text>
                                                <TouchableOpacity onPress={() => handlePress("signin")}>
                                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#B6F25C" }}>Sign in here 🚀</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <LocalButton
                                                handlePress={handlePress}
                                                ctl_Attribute={ctlAttribute.current[13]}
                                            />
                                        </ScrollView>
                                }
                            </>
                        }
                    </View>
                    {
                        getError.isAuth == true &&
                        <>
                            < ErrorComponent
                                setError={setGetError}
                                header={getError.header}
                                body={getError.body}
                            />
                        </>
                    }
                </View >}
        </>

    )
}