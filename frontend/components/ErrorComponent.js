import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function ErrorComponent({ setError, header, body = "sample" }) {
    function handleOnPress() {
        setError({
            isAuth: false,
            header: "",
            body: ""
        })
    }
    return (
        <View style={localStyle.container}>
            <View style={localStyle.header}>
                <Text style={{ color: "white", fontWeight: 900 }}>{header}</Text>
                <TouchableOpacity onPress={() => { handleOnPress() }}>
                    <MaterialIcons name="cancel" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <Text style={localStyle.body}>{body}</Text>
        </View>
    )
}
const localStyle = StyleSheet.create({
    container: { display: "flex", flexDirection: "column", position: "absolute", width: "95%", height: 150, margin: 10, bottom: 0, backgroundColor: "#051123", borderRadius: 10, zIndex: 10 },
    header: { display: "flex", flexDirection: "row", width: "auto", justifyContent: "space-between", backgroundColor: "red", color: "white", padding: 5, margin: 3, borderRadius: 5 },
    body: { width: "auto", padding: 5, margin: 3, color: "white", },
})