import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import GooglePlaceAutoComplete from '../components/GooglePlaceAutoComplete'
import LocalButton from '../components/LocalButton';
import { bootstrap } from "../assets/css/bootstrap"


export default function GetLoction({ navigation }) {
    let drop = null;
    let btnDone = {
        theme: {
            id: "done",
            style: [bootstrap.btnSm, bootstrap.btn, bootstrap.btnLight, bootstrap.noShadow, bootstrap.mhAuto, { width: "95%" }],
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
    }


    function getDrop(quadientes) {
        drop = quadientes
    }
    function handlePress(id) {
        switch (id) {
            case "done":
                if (drop !== null)
                    navigation.navigate('home', { drop })
                break;
        }
    }
    return (
        <View style={{ width: "100%", height: "100%", position: "relative" }}>
            <View style={{ position: "absolute", top: 0, width: "100%" }}>
                <GooglePlaceAutoComplete
                    placeholder="Drop loction"
                    getQuadientes={getDrop} />
            </View>

            <View style={{ position: "absolute", top: 80, width: "100%" }}>
                <LocalButton
                    handlePress={handlePress}
                    ctl_Attribute={btnDone}
                />
            </View>
        </View>
    )
}