import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView,  } from "react-native";
import { Slider, Button, Icon, CheckBox, Tile } from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";

const bmiColorStyle = (bmi) => {
    console.log(bmi > 25 && bmi < 30)
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
    console.log(bmiTextColor)
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
            <Text style={{fontSize: 18, padding: 5, alignSelf: "center", fontWeight: "800"}}>BMI Indicator</Text>
            <View style={{flexDirection: "row", padding: 5}}>
                <View style={[styles.bmiTiteContainer, styles.bmiUnderWeightColor]}>
                    <Text style={{color: "#fff", fontSize: 10, fontWeight: "600"}}>Underweight </Text>
                    <Text style={{color: "#fff", fontWeight: "500"}}>{'<'} 18.5</Text>
                </View>
                <View style={[styles.bmiTiteContainer, styles.bmiHealthyColor]}>
                    <Text style={{color: "#fff", fontSize: 10, fontWeight: "600"}}>Healthy </Text>
                    <Text style={{color: "#fff", fontWeight: "500"}}>18.5 {'-'} 25</Text>
                </View>
                <View style={[styles.bmiTiteContainer, styles.bmiOverWeightColor]}>
                    <Text style={{color: "#fff", fontSize: 10, fontWeight: "600"}}>Overweight </Text>
                    <Text style={{color: "#fff", fontWeight: "500"}}>25 {'-'} 30</Text>
                </View>
                <View style={[styles.bmiTiteContainer, styles.bmiObeseColor]}>
                    <Text style={{color: "#fff", fontSize: 10, fontWeight: "600"}}>Obese </Text>
                    <Text style={{color: "#fff", fontWeight: "500"}}>{'>'} 30</Text>
                </View>
            </View>
        </ScrollView>
        </SafeAreaView>);
}


const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'stretch', justifyContent: 'flex-start', marginTop: 100, marginLeft: 10, marginRight: 10 },
    bmiTiteContainer : {
        borderRadius: 2, 
        alignItems: "center", 
        justifyContent: "center", 
        borderColor: "#eee", 
        borderWidth: 1,  
        flex: 1, 
        padding: 5
    },
    bmiUnderWeightColor: {
        backgroundColor: "#eee000"
    },
    bmiHealthyColor: {
        backgroundColor: "#48A81B"
    },
    bmiOverWeightColor: {
        backgroundColor: "#D3A509"
    },
    bmiObeseColor: {
        backgroundColor: "#F33A2B"
    }
  });