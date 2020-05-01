import * as React from "react";
import { View, Text, StyleSheet,  } from "react-native";
import {CustomText} from "../common/CustomText";

export const BmiIndicator = () => (
    <>
    <CustomText style={{fontSize: 18, padding: 5, alignSelf: "center", fontWeight: "800"}}>BMI Indicator</CustomText>
    <View style={{flexDirection: "row", padding: 5}}>
        <View style={[styles.bmiTitleContainer, styles.bmiUnderWeightColor]}>
            <CustomText style={{color: "#fff", fontSize: 10, fontWeight: "600"}}>Underweight </CustomText>
            <CustomText style={{color: "#fff", fontWeight: "500"}}>{'<'} 18.5</CustomText>
        </View>
        <View style={[styles.bmiTitleContainer, styles.bmiHealthyColor]}>
            <CustomText style={{color: "#fff", fontSize: 10, fontWeight: "600"}}>Healthy </CustomText>
            <CustomText style={{color: "#fff", fontWeight: "500"}}>18.5 {'-'} 25</CustomText>
        </View>
        <View style={[styles.bmiTitleContainer, styles.bmiOverWeightColor]}>
            <CustomText style={{color: "#fff", fontSize: 10, fontWeight: "600"}}>Overweight </CustomText>
            <CustomText style={{color: "#fff", fontWeight: "500"}}>25 {'-'} 30</CustomText>
        </View>
        <View style={[styles.bmiTitleContainer, styles.bmiObeseColor]}>
            <CustomText style={{color: "#fff", fontSize: 10, fontWeight: "600"}}>Obese </CustomText>
            <CustomText style={{color: "#fff", fontWeight: "500"}}>{'>'} 30</CustomText>
        </View>
    </View>
    </>
);

const styles = StyleSheet.create({
    bmiTitleContainer : {
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