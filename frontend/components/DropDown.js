import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GetValidation } from '../function/GetValidation'
import { Picker } from '@react-native-picker/picker';

export const DropDown = ({ ctl_Attribute }) => {
    const validate = GetValidation();
    const [l_rerender, l_setRerender] = useState(false)

    const handleOnChange = (itemValue) => {
        ctl_Attribute.error.errorshow = false;
        ctl_Attribute.inputvalue = itemValue;
        l_setRerender(!l_rerender);
    };

    const handleOnBlur = () => {
        let err = validate(ctl_Attribute);
        if (err.founderror) {
            ctl_Attribute.error.errormsg = err.errmsg;
            ctl_Attribute.error.errorshow = true;
        }
        l_setRerender(!l_rerender);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.pickerContainer, ctl_Attribute.error.errorshow ? styles.errorBorder : null]}>
                <Picker
                    selectedValue={ctl_Attribute.inputvalue}
                    onValueChange={handleOnChange}
                    onBlur={handleOnBlur}
                    enabled={!ctl_Attribute.theme.readonly}
                >
                    <Picker.Item label={ctl_Attribute.theme.labletext} value="" />
                    {ctl_Attribute.dropdata.map((item, index) => (
                        <Picker.Item key={index} label={item.keylistvalue} value={item.keylistid} />
                    ))}
                </Picker>
            </View>

            {ctl_Attribute.error.errorshow ? <Text style={styles.errorText}>{ctl_Attribute.error.errormsg}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        height: 65,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
        height: 55,
    },
    errorBorder: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginTop: 5,
    },
});


//  {
//                     /*txt: Select the Driver : 0*/
//                     arrayindex: 0,
//                     theme: {
//                         labletext: "Select the Driver",
//                         style: [],
//                         id: "sel_driver",
//                         readonly: false,
//                         hinttext:
//                             "Select the driver",
//                     },
//                     inputvalue: "",
//                     validate: {
//                         mandatory: true,
//                         datatype: "dropdown",
//                     },
//                     error: {
//                         errorshow: false,
//                         errormsg: "The field is mandatory",
//                     },
//                     dropdata: driversList,
//                 },