import React, { useState } from "react";
import { View, Text, StyleSheet  } from "react-native";
import { Slider, Button, Icon, CheckBox, Input } from 'react-native-elements';
import {CustomText} from "../common/CustomText";

export const MacroCalculator = ({tdee = 0}) => {
    const [enteredTdee, setTdee] = useState(0);
    const calculateMacros = () => {};
    
    return (
        <>
            <View style={{ padding: 10, marginTop: 20 }}>
                <View style={{marginBottom: 30}}>
                <Input
                    placeholder="TDEE value"
                    label="Enter TDEE"
                    onChangeText={value => setTdee(value)}
                    />
                </View>
                <Button
                    title="CALCULATE"
                    titleStyle={{ color: "#fff", fontWeight: "600" }}
                    type="outline"
                    raised
                    onPress={calculateMacros}
                    buttonStyle={{ backgroundColor: "#072F49" }}
                />
            </View>
            <View style={{margin: 10}}>
            {!!tdee && <CustomText style={{fontSize: 26}}><CustomText style={{fontWeight: '600'}}>BMR:</CustomText> {tdee} calories/day</CustomText>}
            </View>
        </>);
}


const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'stretch', 
        justifyContent: 'space-around',
        backgroundColor: "#fff"
    },
    thumb: {
        height: 30, width: 30, borderRadius: 50, borderWidth: 10, borderColor: "#BFBF06", backgroundColor: "#072F49" 
    }
  });