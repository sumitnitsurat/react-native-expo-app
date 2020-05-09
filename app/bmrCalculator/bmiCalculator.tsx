import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, } from "react-native";
import { Slider, Button, Icon, CheckBox, Tile } from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import { BmiIndicator } from "./bmiIndicator";
import { CustomText } from "../common/CustomText";

const bmiColorStyle = (bmi: number) => {
    switch (true) {
        case bmi < 18.5:
            return "#eee000";
        case bmi >= 18.5 && bmi < 25:
            return "#48A81B";
        case bmi >= 25 && bmi < 30:
            return "#D3A509";
        case bmi >= 30:
            return "#F33A2B";
        default:
            return "#000";
    }
}

export const BmiCalculator = () => {
    const [weight, setWeight] = useState(60);
    const [height, setHeight] = useState(150);
    const [userBMI, setBMI] = useState(0);

    const decimalTwoPoints = (value: number) => Math.round(value * 100) / 100;

    const calculateBMI = () => {
        const heightInMtr = height / 100;
        const bmi = weight / (heightInMtr * heightInMtr);
        const preciseBmi = decimalTwoPoints(bmi);
        setBMI(preciseBmi);
    }
    const heightInFoot = height / 30.48;
    const bmiTextColor = bmiColorStyle(userBMI);

    return (
        <>
            <View style={{ marginTop: 20 }}>

                <View style={{ padding: 10, marginTop: 12 }}>
                    <Slider
                        value={height}
                        minimumValue={20}
                        maximumValue={300}
                        step={1}
                        thumbStyle={styles.thumb}
                        trackStyle={{ height: 10 }}
                        minimumTrackTintColor="#043745"
                        maximumTrackTintColor="#0488AC"
                        onValueChange={value => setHeight(value)}
                    />
                    <CustomText style={{ fontWeight: "600" }}>Height: {height} cm/ {Math.floor(heightInFoot)}' {decimalTwoPoints((heightInFoot % 1) * 12)}''</CustomText>
                </View>
                <View style={{ padding: 10 }}>
                    <Slider
                        value={weight}
                        minimumValue={10}
                        maximumValue={200}
                        step={.5}
                        thumbStyle={styles.thumb}
                        trackStyle={{ height: 10 }}
                        minimumTrackTintColor="#043745"
                        maximumTrackTintColor="#0488AC"
                        onValueChange={value => setWeight(value)}
                    />
                    <CustomText style={{ fontWeight: "600" }}>Weight: {weight} kg/ {decimalTwoPoints(weight * 2.205)} lbs</CustomText>
                </View>
            </View>
            <View style={{ padding: 10, marginTop: 20 }}>
                <Button
                    title="CALCULATE"
                    titleStyle={{ color: "#fff", fontWeight: "600" }}
                    type="outline"
                    raised
                    onPress={calculateBMI}
                    buttonStyle={{ backgroundColor: "#072F49" }}
                />
            </View>
            {!!userBMI && <View style={[styles.bmiValue, styles.boxShadow]}>
                        <Icon
                        type="font-awesome"
                        name="male"
                        size={30}
                        color={bmiTextColor}
                        containerStyle={{margin: 15}}
                        />
                        
                    <View style={{flexDirection: "column", alignItems: "center"}}>
                        <CustomText style={{fontWeight: '600'}}>BMI</CustomText> 
                        <CustomText style={{fontSize: 22}}>{userBMI} kg/m2</CustomText>
                    </View>
                </View>}
            <View style={[styles.definition, styles.boxShadow]}>
                <Icon
                    type="font-awesome"
                    name="info-circle"
                    size={20}
                    color="#072F49"
                />
                <CustomText style={{paddingLeft: 5, paddingRight:10}}><CustomText style={{fontWeight: "bold"}}>BMI(Body Mass Index)</CustomText> is an indicator of body fat based on height and weight of adult men and women.</CustomText>
            </View>
            <BmiIndicator />
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
    },
    definition: { flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, borderWidth: 1, borderRadius: 15, padding: 10, alignItems: "flex-start"},
    bmiValue: { 
        margin: 10, 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1, 
        borderRadius: 55,
        padding: 5
    },
    boxShadow: {shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 6,
    }
});