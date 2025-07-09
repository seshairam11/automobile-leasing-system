import { View, Text } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import LocalButton from '../components/LocalButton'
import { bootstrap } from '../assets/css/bootstrap'
import TextBox from '../components/TextBox'
import { GetValidation } from '../function/GetValidation'
import useFetch from '../function/GetAPI'
import { useSelector } from "react-redux";
import ErrorComponent from '../components/ErrorComponent'
import { TouchableTable } from '../components/TouchableTable'

export default function Driver() {

    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [error, setError] = useState({});

    const ctlAttribute = useRef();
    const tbl_driver = useRef();

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
            apikey: "VIEWDRI"
        };
        serverRequest(serverRequestParam);
        setStartInit(false);
    }

    function initiControl() {
        if (responseData.isAuth) {

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
                    /*Ctl:Email : 1*/
                    arrayindex: 1,
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
                    /*Ctl:Phone no : 2*/
                    arrayindex: 2,
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
                    inputvalue: "Driver",
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
                    //ctl : Add : 4
                    arrayindex: 4,
                    theme: {
                        id: "add",
                        style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgSuccessLight, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                        disable: false,
                        labelText: "Add",
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
                    //ctl : Cancel : 5
                    arrayindex: 5,
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
                    //ctl : Delete : 6
                    arrayindex: 6,
                    theme: {
                        id: "delete",
                        style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgDangerLight, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                        disable: false,
                        labelText: "Delete",
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
            fnBuildDriverList(responseData.value);
            setStartRender(true);
        } else {
            setError({
                isAuth: true,
                header: "Error",
                body: responseData.errormsg,
            })
        }
    }

    function fnBuildDriverList(resTableData) {

        const driverlst = resTableData
            .map(item => ({
                rowid: item._id,
                showrow: true,
                table_value: [
                    {
                        t_key: 0,
                        t_value: item.userName,
                    },
                    {
                        t_key: 1,
                        t_value: item.userType,
                    },
                    {
                        t_key: 2,
                        t_value: item.mailID,
                    },
                    {
                        t_key: 3,
                        t_value: item.phone,
                    },
                ]
            }))

        let l_tbl_driver = {
            tablename: "tbl_driverlist",
            tableindex: null,
            tabledataid: null,
            colMetaData: [
                {
                    h_colindex: 0,
                    h_name: "User name",
                    h_width: "150",
                    h_txtalign: "left",
                },
                {
                    h_colindex: 1,
                    h_name: "User type",
                    h_width: "43",
                    h_txtalign: "left",
                },
                {
                    h_colindex: 2,
                    h_name: "Mail",
                    h_width: "100",
                    h_txtalign: "left",
                },
                {
                    h_colindex: 3,
                    h_name: "Phone",
                    h_width: "100",
                    h_txtalign: "left",
                },
            ],
            tableData: driverlst,
        };
        tbl_driver.current = l_tbl_driver
    }

    function handlePress(id) {
        switch (id) {
            case "add":
                fnAdd();
                break;
            case "cancel":
                modifyReadOnly([0, 1, 2], false);
                makeitNormal([0, 1, 2]);
                setDeleteData(false);
                break;
            case "delete":
                fnDelete();
                break;

        }
    }
    async function fnAdd() {
        const result = await loopingValidation([0, 1, 2,]);
        if (result) {

            let _addDriver = {
                userName: ctlAttribute.current[0].inputvalue,
                mailID: ctlAttribute.current[1].inputvalue,
                phone: ctlAttribute.current[2].inputvalue,
                userType: ctlAttribute.current[3].inputvalue,
                password: "Sample@123",
                referId: appState._id,
            }
            let serverRequestParam = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(_addDriver),
                apiUrl: "/api/v1/adddriver",
                apikey: "ADDDRIVER"
            };
            serverRequest(serverRequestParam);
            setError({});
        }
    }

    function fnDelete() {
        let _deleteDriver = {
            _id: tbl_driver.current.tabledataid,
        }
        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_deleteDriver),
            apiUrl: "/api/v1/deletedriver",
            apikey: "DELETEDRIVER"
        };
        serverRequest(serverRequestParam);
    }

    function handleClickTable(index) {
        const driverDetial = tbl_driver.current.tableData[index];
        tbl_driver.current.tableindex = index;
        tbl_driver.current.tabledataid = driverDetial.rowid;
        ctlAttribute.current[0].inputvalue = driverDetial.table_value[0].t_value
        ctlAttribute.current[1].inputvalue = driverDetial.table_value[2].t_value
        ctlAttribute.current[2].inputvalue = driverDetial.table_value[3].t_value
        modifyReadOnly([0, 1, 2], true);
        removeErrors([0, 1, 2])
        setDeleteData(true);
        setRerender(!rerender)
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



    function fnAddDriver() {
        if (responseData.isAuth) {
            tbl_driver.current.tableData.unshift({
                rowid: responseData.value[0]._id,
                showrow: true,
                table_value: [
                    { t_key: "0", t_value: responseData.value[0].userName },
                    { t_key: "1", t_value: responseData.value[0].userType },
                    { t_key: "2", t_value: responseData.value[0].mailID },
                    { t_key: "3", t_value: responseData.value[0].phone },
                ],
            },);
            makeitNormal([0, 1, 2]);
            setRerender(!rerender);
        } else {
            setError({
                isAuth: true,
                header: "Error",
                body: responseData.value
            })
        }
    }

    function fnDeleteDriver() {
        if (responseData.isAuth) {
            tbl_driver.current.tableData.splice(tbl_driver.current.tableindex, 1);
            makeitNormal([0, 1, 2]);
            modifyReadOnly([0, 1, 2], false);
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
            fnViewDriverRequest();
        } else {
            if (isLoadingApi) {
                switch (apiKey) {
                    case "ADDDRIVER":
                        fnAddDriver();
                        break;
                    case "VIEWDRI":
                        initiControl();
                        break;
                    case "DELETEDRIVER":
                        fnDeleteDriver();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi]);

    return (
        <>
            {startRender &&
                < View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 33, margin: 10, fontWeight: 500 }}>Add driver </Text>
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
                    <View>
                        {!deleteData ?
                            <LocalButton
                                handlePress={handlePress}
                                ctl_Attribute={ctlAttribute.current[4]}
                            /> :
                            <>
                                <LocalButton
                                    handlePress={handlePress}
                                    ctl_Attribute={ctlAttribute.current[5]}
                                />
                                <LocalButton
                                    handlePress={handlePress}
                                    ctl_Attribute={ctlAttribute.current[6]}
                                />
                            </>}
                    </View>

                    <TouchableTable
                        tableData={tbl_driver.current.tableData}
                        colMetaData={tbl_driver.current.colMetaData}
                        handleClickTable={handleClickTable}
                    />

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