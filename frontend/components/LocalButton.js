import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const LocalButton = ({ handlePress, ctl_Attribute }) => {
    return (
        <TouchableOpacity
            style={ctl_Attribute.theme.style} // Default style
            disabled={ctl_Attribute.theme.disable}
            onPress={() => handlePress(ctl_Attribute.theme.id)}
        >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                {ctl_Attribute.icon.setIcon && <MaterialIcons name={ctl_Attribute.icon.name} size={ctl_Attribute.icon.size} color={ctl_Attribute.icon.color} style={ctl_Attribute.theme.labelText !== null ? { marginRight: 5 } : {}} />}
                {ctl_Attribute.theme.labelText !== null ? <Text style={ctl_Attribute.theme.labelTextStyle}>{ctl_Attribute.theme.labelText}</Text> : <></>}
            </View>
        </TouchableOpacity>
    );
};

export default LocalButton
