import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView,  } from "react-native";
import { Slider, Button, Icon, CheckBox, Tile } from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import {BmiIndicator} from "./bmiIndicator";
import {CustomText} from "../common/CustomText";

const bmiColorStyle = (bmi) => {
    switch(true) {
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

export const BmrCalculator = () => {
    const [age, setAge] = useState(20);
    const [weight, setWeight] = useState(60);
    const [height, setHeight] = useState(150);
    const [walk, setWalk] = useState(0);
    const [gender, setGender] = useState("male");
    const [userBMR, setBMR] = useState(0);
    const [userBMI, setBMI] = useState(0);

    const decimalTwoPoints = (value: number) => Math.round(value * 100) / 100;

    const calculeteBMR = () => {
        const totalWalkCalories = walk*60*(.03 * weight*1/0.45) / 7;
        const bmr = (10 * weight + 6.25 * height + totalWalkCalories - 5 * age) + (gender === "male" ? 5 : -161);
        const preciseBmr = decimalTwoPoints(bmr);
        const heightInMtr = height/100;
        const bmi = weight/ (heightInMtr* heightInMtr);
        const preciseBmi = decimalTwoPoints(bmi);
        setBMR(preciseBmr);
        setBMI(preciseBmi)
    }
    const heightInFoot = height/30.48;
    const bmiTextColor = bmiColorStyle(userBMI);

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView >
            <CustomText style={{ fontWeight: "600", fontSize: 24, textAlign: "center" }}>GET YOUR BMR</CustomText>
            <Icon type="font-awesome" name="male" size={55} color="#4863A0" />
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection:'row',alignItems:'flex-start',justifyContent:'space-around'}}>
                <CheckBox
                    title='Male'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle={{backgroundColor:'transparent'}}
                    onPress={() => setGender('male')}
                    checked={gender === 'male'}
                    />
                <CheckBox
                    title='Female'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle={{backgroundColor:'transparent'}}
                    onPress={() => setGender('female')}
                    checked={gender === 'female'}
                    />
                    </View>
                <View style={{ padding: 10, marginTop: 12 }}>
                    <Slider
                        value={height}
                        minimumValue={20}
                        maximumValue={300}
                        step={1}
                        thumbStyle={styles.thumb}
                        trackStyle={{ height: 10 }}
                        minimumTrackTintColor="#4b4a67"
                        maximumTrackTintColor="#ADD8E6"
                        onValueChange={value => setHeight(value)}
                    />
                    <CustomText style={{ fontWeight: "600" }}>Height: {height} cm/ {Math.floor(heightInFoot)}' {decimalTwoPoints((heightInFoot % 1)*12)}''</CustomText>
                </View>
                <View style={{ padding: 10 }}>
                    <Slider
                        value={weight}
                        minimumValue={10}
                        maximumValue={200}
                        step={.5}
                        thumbStyle={styles.thumb}
                        trackStyle={{ height: 10 }}
                        minimumTrackTintColor="#4b4a67"
                        maximumTrackTintColor="#ADD8E6"
                        onValueChange={value => setWeight(value)}
                    />
                    <CustomText style={{ fontWeight: "600" }}>Weight: {weight} kg/ {decimalTwoPoints(weight * 2.205)} lbs</CustomText>
                </View>
                <View style={{ padding: 10 }}>
                    <Slider
                        value={age}
                        maximumValue={100}
                        step={1}
                        animationConfig={{toValue: 1, duration: 100}}
                        thumbStyle={styles.thumb}
                        trackStyle={{ height: 10 }}
                        minimumTrackTintColor="#4b4a67"
                        maximumTrackTintColor="#ADD8E6"
                        onValueChange={value => setAge(value)}
                    />
                    <CustomText style={{ fontWeight: "600" }}>Age: {age} years</CustomText>
                </View>
                <View style={{ padding: 10 }}>
                    <Slider
                        value={walk}
                        maximumValue={50}
                        step={1}
                        thumbStyle={styles.thumb}
                        trackStyle={{ height: 10 }}
                        minimumTrackTintColor="#4b4a67"
                        maximumTrackTintColor="#ADD8E6"
                        onValueChange={value => setWalk(value)}
                    />
                    <CustomText style={{ fontWeight: "600" }}>Walking: {walk} hrs/week</CustomText>
                </View>
            </View>
            <View style={{ padding: 10, marginTop: 20 }}>
                <Button
                    title="CALCULATE"
                    titleStyle={{ color: "#fff", fontWeight: "600" }}
                    type="outline"
                    raised
                    onPress={calculeteBMR}
                    buttonStyle={{ backgroundColor: "#151B54" }}
                />
            </View>
            <View style={{margin: 10}}>
            {!!userBMR && <CustomText style={{fontSize: 26}}><CustomText style={{fontWeight: '600'}}>BMR:</CustomText> {userBMR} calories/day</CustomText>}
            </View>
            <View style={{margin: 10}}>
            {!!userBMI && <CustomText style={{fontSize: 26}}><CustomText style={{fontWeight: '600'}}>BMI:</CustomText> <CustomText style={{color: bmiTextColor}}>{userBMI}</CustomText></CustomText>}
            </View>
            <BmiIndicator />
        </ScrollView>
        </SafeAreaView>);
}


const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'stretch', 
        justifyContent: 'space-around',
        backgroundColor: "#fff"
    },
    thumb: {
        height: 30, width: 30, borderRadius: 50, borderWidth: 10, borderColor: "#065E9F", backgroundColor: "#fff" 
    }
  });