import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView,  } from "react-native";
import { Slider, Button, Icon, CheckBox, Tile } from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import {BmiIndicator} from "./bmiIndicator";

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
            <Text style={{ fontWeight: "600", fontSize: 24, textAlign: "center" }}>GET YOUR BMR</Text>
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
                        thumbStyle={{ height: 40, backgroundColor: "#2B547E" }}
                        trackStyle={{ height: 20 }}
                        minimumTrackTintColor="#151B8D"
                        maximumTrackTintColor="#ADD8E6"
                        onValueChange={value => setHeight(value)}
                    />
                    <Text style={{ fontWeight: "600" }}>Height: {height} cm/ {Math.floor(heightInFoot)}' {decimalTwoPoints((heightInFoot % 1)*12)}''</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Slider
                        value={weight}
                        minimumValue={10}
                        maximumValue={200}
                        step={.5}
                        thumbStyle={{ height: 40, backgroundColor: "#2B547E" }}
                        trackStyle={{ height: 20 }}
                        minimumTrackTintColor="#151B8D"
                        maximumTrackTintColor="#ADD8E6"
                        onValueChange={value => setWeight(value)}
                    />
                    <Text style={{ fontWeight: "600" }}>Weight: {weight} kg/ {decimalTwoPoints(weight * 2.205)} lbs</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Slider
                        value={age}
                        maximumValue={100}
                        step={1}
                        animationConfig={{toValue: 1, duration: 100}}
                        thumbStyle={{ height: 40, backgroundColor: "#2B547E" }}
                        trackStyle={{ height: 20 }}
                        minimumTrackTintColor="#151B8D"
                        maximumTrackTintColor="#ADD8E6"
                        onValueChange={value => setAge(value)}
                    />
                    <Text style={{ fontWeight: "600" }}>Age: {age} years</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Slider
                        value={walk}
                        maximumValue={50}
                        step={1}
                        thumbStyle={{ height: 40, backgroundColor: "#2B547E" }}
                        trackStyle={{ height: 20 }}
                        minimumTrackTintColor="#151B8D"
                        maximumTrackTintColor="#ADD8E6"
                        onValueChange={value => setWalk(value)}
                    />
                    <Text style={{ fontWeight: "600" }}>Walking: {walk} hrs/week</Text>
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
            {!!userBMR && <Text style={{fontSize: 26}}><Text style={{fontWeight: '600'}}>BMR:</Text> {userBMR} calories/day</Text>}
            </View>
            <View style={{margin: 10}}>
            {!!userBMI && <Text style={{fontSize: 26}}><Text style={{fontWeight: '600'}}>BMI:</Text> <Text style={{color: bmiTextColor}}>{userBMI}</Text></Text>}
            </View>
            <BmiIndicator />
        </ScrollView>
        </SafeAreaView>);
}


const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'stretch', 
        justifyContent: 'flex-start', 
        marginTop: 100, 
        marginLeft: 10, 
        marginRight: 10 
    },
  });