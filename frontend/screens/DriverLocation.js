import { View, Text } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import LocalButton from '../components/LocalButton'
import { bootstrap } from '../assets/css/bootstrap'
import { GetValidation } from '../function/GetValidation'
import useFetch from '../function/GetAPI'
import { useSelector } from "react-redux";
import ErrorComponent from '../components/ErrorComponent'
import { DropDown } from '../components/DropDown'
import TextBox from '../components/TextBox'

export default function DriverLocation({ navigation }) {

    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [error, setError] = useState({});

    const ctlAttribute = useRef();

    const validate = GetValidation();
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
    const appState = useSelector((state) => state.appstate.login_info);

    function fnViewDriverRequest() {
        let _getBody = {
            referId: appState._id,
        }
        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/viewdrivers",
            apikey: "DRIVERLOC"
        };
        serverRequest(serverRequestParam);
        setStartInit(false);
    }

    function initiControl() {
        if (responseData.isAuth) {
            const driversList = responseData.value.map((item) => ({
                keylistid: item._id,
                keylistvalue: item.userName,
            }))
            const ctl_array = [
                {
                    /*txt: Select the Driver : 0*/
                    arrayindex: 0,
                    theme: {
                        labletext: "Select the Driver",
                        style: [],
                        id: "sel_driver",
                        readonly: false,
                        hinttext:
                            "Select the driver",
                    },
                    inputvalue: "",
                    validate: {
                        mandatory: true,
                        datatype: "dropdown",
                    },
                    error: {
                        errorshow: false,
                        errormsg: "The field is mandatory",
                    },
                    dropdata: driversList,
                },
                {
                    /*Ctl:Driver id : 1*/
                    arrayindex: 1,
                    theme: {
                        placeholder: "Driver id",
                        id: "txt_driverid",
                        inputtype: "text",
                        length: 30,
                        isfocus: "",
                        securetext: false,
                        readonly: false,
                        sethint: false,
                        hinttext: "Enter your Driver id",
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
                    //ctl : Cancel : 2
                    arrayindex: 2,
                    theme: {
                        id: "cancel",
                        style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgWhite, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                        disable: false,
                        labelText: "Cancel",
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
                    //ctl : Done : 3
                    arrayindex: 3,
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

            ]
            ctlAttribute.current = ctl_array;
            setStartRender(true);
        } else {
            setError({
                isAuth: true,
                header: "Error",
                body: responseData.errormsg,
            })
        }
    }

    function handlePress(id) {
        switch (id) {
            case "done":
                fnDone()
                break;
            case "cancel":
                makeitNormal([0]);
                navigation.goBack()
                break;
        }
        setRerender(!rerender);
    }
    async function fnDone() {
        if (appState.userType == "Fleet Owner") {
            const result = await loopingValidation([0]);
            if (result) {
                navigation.navigate('home', ctlAttribute.current[0].inputvalue)
            }
        } else {
            const result = await loopingValidation([1]);
            if (result) {
                navigation.navigate('home', ctlAttribute.current[1].inputvalue)
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
            return false;
        }
        return true;
    }
    function removeErrors(array) {
        array.map(num => {
            ctlAttribute.current[num].theme.sethint = false
            ctlAttribute.current[num].error.errorshow = false
        })
    }
    function makeitNormal(array) {
        array.map(num => {
            ctlAttribute.current[num].inputvalue = ""
            ctlAttribute.current[num].theme.sethint = false
            ctlAttribute.current[num].error.errorshow = false
        })
    }
    function modifyReadOnly(arr, bool) {
        arr.forEach(num => {
            ctlAttribute.current[num].theme.readonly = bool;
        })
    }





    useEffect(() => {
        if (startInit === true) {
            fnViewDriverRequest();
        } else {
            if (isLoadingApi) {
                switch (apiKey) {
                    case "DRIVERLOC":
                        initiControl();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi]);

    return (
        <>
            {startRender &&
                < View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 33, margin: 10, fontWeight: 500 }}>Search driver</Text>
                    <View style={{ marginTop: 0, width: "98%", marginHorizontal: "auto", marginBottom: 15, }}>
                        {appState.userType == "Fleet Owner" &&
                            <DropDown
                                ctl_Attribute={ctlAttribute.current[0]}
                            />}
                        {appState.userType == "Seller" &&
                            <TextBox
                                ctl_Attribute={ctlAttribute.current[1]}
                            />
                        }
                    </View>
                    <View>
                        <LocalButton
                            handlePress={handlePress}
                            ctl_Attribute={ctlAttribute.current[2]}
                        />
                        <LocalButton
                            handlePress={handlePress}
                            ctl_Attribute={ctlAttribute.current[3]}
                        />
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