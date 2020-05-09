import React, { useState } from "react";
import { View, Text, StyleSheet  } from "react-native";
import { Slider, Button, Icon, CheckBox, Tile } from 'react-native-elements';
import {CustomText} from "../common/CustomText";
import Picker from 'react-native-picker-select';

const exerciseFactor = {"no": 1, "sedentary": 1.2, "lightactive": 1.375, "modactive": 1.55, "veryactive": 1.725, "extraactive": 1.9};

export const BmrCalculator = () => {
    const [age, setAge] = useState(20);
    const [weight, setWeight] = useState(60);
    const [height, setHeight] = useState(150);
    const [walk, setWalk] = useState(0);
    const [gender, setGender] = useState("male");
    const [userBMR, setBMR] = useState(0);
    const [userTDEE, setTDEE] = useState(0);
    const [selectedValue, setSelectedValue] = useState("no");

    const decimalTwoPoints = (value: number) => Math.round(value * 100) / 100;

    const calculateBMR = () => {
        const bmr = (10 * weight + 6.25 * height - 5 * age) + (gender === "male" ? 5 : -161);
        const tdee = bmr * exerciseFactor[selectedValue];
        const preciseBmr = decimalTwoPoints(bmr);
        setBMR(preciseBmr);
        setTDEE(decimalTwoPoints(tdee));
    }
    const heightInFoot = height/30.48;

    return (
        <>
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection:'row',alignItems:'flex-start',justifyContent:'space-around'}}>
                <CheckBox
                    title='Male'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle={{backgroundColor:'transparent'}}
                    checkedColor="#043745"
                    onPress={() => setGender('male')}
                    checked={gender === 'male'}
                    />
                <CheckBox
                    title='Female'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle={{backgroundColor:'transparent'}}
                    checkedColor="#043745"
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
                        minimumTrackTintColor="#043745"
                        maximumTrackTintColor="#0488AC"
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
                        minimumTrackTintColor="#043745"
                        maximumTrackTintColor="#0488AC"
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
                        minimumTrackTintColor="#043745"
                        maximumTrackTintColor="#0488AC"
                        onValueChange={value => setAge(value)}
                    />
                    <CustomText style={{ fontWeight: "600" }}>Age: {age} years</CustomText>
                </View>
                <View style={{ padding: 10 }}>
                    <Picker
                        value={selectedValue}
                        style={{viewContainer: {borderWidth: 1, padding: 8, borderColor: "#043745"}}}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        items={[{label:"No Exercise", value:"no"}, 
                        {label:"Limited Exercise", value:"sedentary"},
                        {label:"Lightly Active (less than three days a week)", value:"lightactive"},
                        {label:"Moderately Exercise (most days of the week)", value:"modactive"},
                        {label:"Very Active (Hard exercise everyday)", value:"veryactive"},
                        {label:"Extra Active(Strenuous exercise two or more times a day)", value:"extraactive"}
                    ]}
                    >
                    </Picker>
                </View>
            </View>
            <View style={{ padding: 10, marginTop: 20 }}>
                <Button
                    title="CALCULATE"
                    titleStyle={{ color: "#fff", fontWeight: "600" }}
                    type="outline"
                    raised
                    onPress={calculateBMR}
                    buttonStyle={{ backgroundColor: "#072F49" }}
                />
            </View>
            {!!userBMR && !!userTDEE && <View style={{flexDirection: "row"}}>
             <View style={[styles.bmrValue, styles.boxShadow]}>
                        <Icon
                        type="font-awesome"
                        name="fire"
                        size={20}
                        color="#F04707"
                        containerStyle={{marginRight: 5}}
                        />
                        
                    <View style={{flexDirection: "column", alignItems: "center"}}>
                        <CustomText style={{fontWeight: '600'}}>BMR</CustomText> 
                        <CustomText style={{fontSize: 16}}>{userBMR} cal/day</CustomText>
                    </View>
                </View>
                <View style={[styles.bmrValue, styles.boxShadow]}>
                    <Icon
                        type="font-awesome"
                        name="bolt"
                        size={20}
                        color="#F04707"
                        containerStyle={{marginRight: 5}}
                        />
                    <View style={{flexDirection: "column", alignItems: "center"}}>
                        <CustomText style={{fontWeight: '600'}}>TDEE</CustomText> 
                        <CustomText style={{fontSize: 16}}>{userTDEE} cal/day</CustomText>
                    </View>
                </View>
            </View>}
            <View style={[styles.definition, styles.boxShadow]}>
            <Icon
                type="font-awesome"
                name="info-circle"
                size={20}
                color="#072F49"
            />
                <CustomText style={{paddingLeft: 5, paddingRight: 10}}> <CustomText style={{fontWeight: "bold"}}>BMR(Basal Metabolic Rate)</CustomText> is the number of calories required to keep your body functioning at rest. </CustomText>
            </View>
            <View style={[styles.definition, styles.boxShadow]}>
                <Icon
                    type="font-awesome"
                    name="info-circle"
                    size={20}
                    color="#072F49"
                />
                <CustomText style={{paddingLeft: 5, paddingRight: 10}}><CustomText style={{fontWeight: "bold"}}>TDEE(Total Daily Energy Expenditure)</CustomText> is the number of calories you burn per day when exercise is taken into account. </CustomText>
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
    },
    definition: { flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, borderWidth: 1, borderRadius: 10, padding: 10, alignItems: "flex-start"},
    bmrValue: { 
        margin: 10, 
        flex: 1, 
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
        
        elevation: 8,
    }
  });