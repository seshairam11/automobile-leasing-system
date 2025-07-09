import { View, Text } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import LocalButton from '../components/LocalButton'
import { bootstrap } from '../assets/css/bootstrap'
import { GetValidation } from '../function/GetValidation'
import useFetch from '../function/GetAPI'
import { useSelector } from "react-redux";
import ErrorComponent from '../components/ErrorComponent'
import TextBox from '../components/TextBox'
import { DropDown } from '../components/DropDown'
import { TouchableTable } from '../components/TouchableTable'

export default function AddLocation({ navigation }) {

    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [error, setError] = useState({});
    const [deleteData, setDeleteData] = useState(false);

    const ctlAttribute = useRef();
    const tbl_marker = useRef();

    const validate = GetValidation();
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
    const appState = useSelector((state) => state.appstate.login_info);

    function fnListMarkerRequest() {
        let _getBody = {
            referId: appState._id,
        }
        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/listlocation",
            apikey: "LISTMARKER"
        };
        serverRequest(serverRequestParam);
        setStartInit(false);
    }

    function initiControl() {
        if (responseData.isAuth) {
            const ctl_array = [
                {
                    /*Ctl:Latitude : 0*/
                    arrayindex: 0,
                    theme: {
                        placeholder: "Latitude",
                        id: "txt_driverid",
                        inputtype: "text",
                        length: 30,
                        isfocus: "",
                        securetext: false,
                        readonly: false,
                        sethint: false,
                        hinttext: "Enter the Latitude",
                    },
                    inputvalue: "",
                    validate: {
                        mandatory: true,
                        datatype: "numeric",
                    },
                    error: {
                        errorshow: false,
                        errormsg: "The field is mandatory",
                    },
                },
                {
                    /*Ctl:Longitude : 1*/
                    arrayindex: 1,
                    theme: {
                        placeholder: "Longitude",
                        id: "txt_driverid",
                        inputtype: "text",
                        length: 30,
                        isfocus: "",
                        securetext: false,
                        readonly: false,
                        sethint: false,
                        hinttext: "Enter the Longitude",
                    },
                    inputvalue: "",
                    validate: {
                        mandatory: true,
                        datatype: "numeric",
                    },
                    error: {
                        errorshow: false,
                        errormsg: "The field is mandatory",
                    },
                },
                {
                    /*Ctl:Count : 2*/
                    arrayindex: 2,
                    theme: {
                        placeholder: "Count",
                        id: "txt_driverid",
                        inputtype: "text",
                        length: 30,
                        isfocus: "",
                        securetext: false,
                        readonly: false,
                        sethint: false,
                        hinttext: "Enter the Count",
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
                    /*Ctl:Status : 3*/
                    arrayindex: 3,
                    theme: {
                        labletext: "Select the status",
                        style: [],
                        id: "sel_status",
                        readonly: false,
                        hinttext: "Select the status",
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
                    dropdata: [
                        {
                            keylistid: 0,
                            keylistvalue: "Red"
                        },
                        {
                            keylistid: 1,
                            keylistvalue: "Orange"
                        },
                        {
                            keylistid: 3,
                            keylistvalue: "Green"
                        },
                    ],
                },
                {
                    /*Ctl:Location name : 4*/
                    arrayindex: 4,
                    theme: {
                        placeholder: "Location name",
                        id: "txt_driverid",
                        inputtype: "text",
                        length: 30,
                        isfocus: "",
                        securetext: false,
                        readonly: false,
                        sethint: false,
                        hinttext: "Enter your Location name",
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
                    //ctl : Done : 5
                    arrayindex: 5,
                    theme: {
                        id: "done",
                        style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgSuccess, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                        disable: false,
                        labelText: "Done",
                        labelTextStyle: [bootstrap.textWhite]
                    },
                    icon: {
                        setIcon: false,
                        name: "",
                        size: 0,
                        color: "",
                    }
                },
                {
                    //ctl : Cancel : 6
                    arrayindex: 6,
                    theme: {
                        id: "cancel",
                        style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgDanger, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                        disable: false,
                        labelText: "Cancel",
                        labelTextStyle: [bootstrap.textWhite]
                    },
                    icon: {
                        setIcon: false,
                        name: "",
                        size: 0,
                        color: "",
                    }
                },
                {
                    //ctl : Delete : 7
                    arrayindex: 7,
                    theme: {
                        id: "delete",
                        style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgSuccess, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                        disable: false,
                        labelText: "Delete",
                        labelTextStyle: [bootstrap.textWhite]
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
            fnBuildMarkerList(responseData.value);
            setStartRender(true);
        } else {
            setError({
                isAuth: true,
                header: "Error",
                body: responseData.errormsg,
            })
        }
    }
    function fnBuildMarkerList(resTableData) {

        const Markerlst = resTableData
            .map(item => ({
                rowid: item._id,
                showrow: true,
                table_value: [
                    {
                        t_key: 0,
                        t_value: item.lat,
                    },
                    {
                        t_key: 1,
                        t_value: item.long,
                    },
                    {
                        t_key: 2,
                        t_value: item.locationName,
                    },
                ]
            }))
        let l_tbl_marker = {
            tablename: "tbl_markerlist",
            tableindex: null,
            tabledataid: null,
            colMetaData: [
                {
                    h_colindex: 0,
                    h_name: "Latitude",
                    h_width: "150",
                    h_txtalign: "left",
                },
                {
                    h_colindex: 1,
                    h_name: "Longitude",
                    h_width: "43",
                    h_txtalign: "left",
                },
                {
                    h_colindex: 2,
                    h_name: "Location name",
                    h_width: "100",
                    h_txtalign: "left",
                },
            ],
            tableData: Markerlst,
        };
        tbl_marker.current = l_tbl_marker
    }

    function handlePress(id) {
        switch (id) {
            case "done":
                fnDone()
                break;
            case "delete":
                fnDelete();
                break;
            case "cancel":
                modifyReadOnly([0, 1, 2, 3, 4], false);
                makeitNormal([0, 1, 2, 3, 4]);
                setDeleteData(false);
                break;
        }
        setRerender(!rerender);
    }
    function handleClickTable(index) {
        const markerDetials = tbl_marker.current.tableData[index];
        tbl_marker.current.tableindex = index;
        tbl_marker.current.tabledataid = markerDetials.rowid;
        ctlAttribute.current[0].inputvalue = String(markerDetials.table_value[0].t_value);
        ctlAttribute.current[1].inputvalue = String(markerDetials.table_value[1].t_value);
        ctlAttribute.current[4].inputvalue = markerDetials.table_value[2].t_value;
        modifyReadOnly([0, 1, 4], true);
        removeErrors([0, 1, 4]);
        setDeleteData(true);
        setRerender(!rerender);
    }
    async function fnDone() {
        const result = await loopingValidation([0, 1, 4]);
        if (result) {
            let _insertMarker = {
                lat: ctlAttribute.current[0].inputvalue,
                long: ctlAttribute.current[1].inputvalue,
                locationName: ctlAttribute.current[4].inputvalue,
                referId: appState._id,
            }
            let serverRequestParam = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(_insertMarker),
                apiUrl: "/api/v1/createlocation",
                apikey: "INSERTMARKER"
            };
            serverRequest(serverRequestParam);
        }
    }
    function fnDelete() {
        let _deleteDriver = {
            _id: tbl_marker.current.tabledataid,
        }
        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_deleteDriver),
            apiUrl: "/api/v1/deletelocation",
            apikey: "DELETEMARKER"
        };
        serverRequest(serverRequestParam);
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

    function fnResponseInsertMarker() {
        if (responseData.isAuth) {
            tbl_marker.current.tableData.unshift({
                rowid: responseData.value[0]._id,
                showrow: true,
                table_value: [
                    { t_key: "0", t_value: responseData.value[0].lat },
                    { t_key: "1", t_value: responseData.value[0].long },
                    { t_key: "2", t_value: responseData.value[0].locationName },
                ],
            },);
            makeitNormal([0, 1, 2, 3, 4]);
            setRerender(!rerender);
        } else {
            setError({
                isAuth: true,
                header: "Error",
                body: responseData.value
            })
        }
    }
    function fnResponseDeleteMarker() {
        if (responseData.isAuth) {
            tbl_marker.current.tableData.splice(tbl_marker.current.tableindex, 1);
            makeitNormal([0, 1, 2, 3, 4]);
            modifyReadOnly([0, 1, 2, 3, 4], false);
            setDeleteData(false);
        } else {
            setError({
                isAuth: true,
                header: "Error",
                body: responseData.value
            })
        }
    }

    useEffect(() => {
        if (startInit === true) {
            fnListMarkerRequest();
        } else {
            if (isLoadingApi) {
                switch (apiKey) {
                    case "LISTMARKER":
                        initiControl();
                        break;
                    case "DELETEMARKER":
                        fnResponseDeleteMarker();
                        break;
                    case "INSERTMARKER":
                        fnResponseInsertMarker();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi]);

    return (
        <>
            {startRender &&
                < View style={{ flex: 1, backgroundColor: "#01050D" }}>
                    <Text style={{ fontSize: 33, margin: 10, fontWeight: 500, color: "white" }}>Search driver</Text>
                    <View style={{ marginTop: 0, width: "98%", marginHorizontal: "auto", marginBottom: 15, }}>
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[0]}
                        />
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[1]}
                        />
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[4]}
                        />

                    </View>
                    <View>
                        {!deleteData ?
                            <LocalButton
                                handlePress={handlePress}
                                ctl_Attribute={ctlAttribute.current[5]}
                            /> :
                            <>
                                <LocalButton
                                    handlePress={handlePress}
                                    ctl_Attribute={ctlAttribute.current[6]}
                                />
                                <LocalButton
                                    handlePress={handlePress}
                                    ctl_Attribute={ctlAttribute.current[7]}
                                />
                            </>}
                    </View>
                    <View>
                        <TouchableTable
                            tableData={tbl_marker.current.tableData}
                            colMetaData={tbl_marker.current.colMetaData}
                            handleClickTable={handleClickTable}
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