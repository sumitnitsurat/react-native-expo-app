import React, { useState } from "react";
import { View, Text, StyleSheet  } from "react-native";
import { Slider, Button, Icon, Card, Input } from 'react-native-elements';
import {CustomText} from "../common/CustomText";

export const MacroCalculator = ({tdee = 0}) => {
    const [enteredTdee, setTdee] = useState(0);
    const decimalTwoPoints = (value: number) => Math.round(value * 100) / 100;
    
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
            </View>
            <View style={[styles.definition, styles.boxShadow]}>
                <Icon
                    type="font-awesome"
                    name="info-circle"
                    size={20}
                    color="#072F49"
                />
                <CustomText style={{paddingLeft: 5, paddingRight:10}}>
                <CustomText style={{fontWeight: "bold"}}>MACROS(Macronutrients) </CustomText> 
                are the building blocks of the nutrition known as protein, carbs and fat.
                </CustomText>
            </View>
            <View style={[styles.card, styles.boxShadow]}>
                <Card title="For Recomposition" containerStyle={styles.cardContainer} titleStyle={styles.cardTitle}>
                    <CustomText style={styles.cardText}>Total Calories: {enteredTdee} cal</CustomText>
                    <CustomText style={styles.cardText}>Carbohydrate: {decimalTwoPoints((enteredTdee * .55)/4)} grams</CustomText>
                    <CustomText style={styles.cardText}>Protein: {decimalTwoPoints((enteredTdee * .15)/4)} grams</CustomText>
                    <CustomText style={styles.cardText}>Fat: {decimalTwoPoints((enteredTdee * .25)/9)} grams</CustomText>
                </Card>
            </View>
            <View style={[styles.card, styles.boxShadow]}>
                <Card title="For Fat Loss" containerStyle={styles.cardContainer} titleStyle={styles.cardTitle}>
                    <CustomText style={styles.cardText}>Total Calories: {enteredTdee - (enteredTdee * .20)} cal</CustomText>
                    <CustomText style={styles.cardText}>Carbohydrate: {decimalTwoPoints((enteredTdee * .65)/4)} grams</CustomText>
                    <CustomText style={styles.cardText}>Protein: {decimalTwoPoints((enteredTdee * .20)/4)} grams</CustomText>
                    <CustomText style={styles.cardText}>Fat: {decimalTwoPoints((enteredTdee * .30)/9)} grams</CustomText>
                </Card>
            </View>
            <View style={[styles.card, styles.boxShadow, {marginBottom: 10}]}>
                <Card title="For Muscle Gain" containerStyle={styles.cardContainer} titleStyle={styles.cardTitle}>
                    <CustomText style={styles.cardText}>Total Calories: {Number(enteredTdee) + (enteredTdee * .20)} cal</CustomText>
                    <CustomText style={styles.cardText}>Carbohydrate: {decimalTwoPoints((enteredTdee * .50)/4)} grams</CustomText>
                    <CustomText style={styles.cardText}>Protein: {decimalTwoPoints((enteredTdee * .25)/4)} grams</CustomText>
                    <CustomText style={styles.cardText}>Fat: {decimalTwoPoints((enteredTdee * .20)/9)} grams</CustomText>
                </Card>
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
    card: {
        marginRight: 20
    },
    definition: { flexDirection: "row", marginLeft: 15, marginRight: 15, marginTop: 10, borderWidth: 1, borderRadius: 10, padding: 10, alignItems: "flex-start"},
    boxShadow: {shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 8,
    },
    cardText: {color: "#000", padding: 6, fontSize: 14},
    cardContainer: {marginRight: 0, flex: 1, backgroundColor: "#fff", borderRadius: 10},
    cardTitle: {fontSize: 16, color: "#000"}
  });