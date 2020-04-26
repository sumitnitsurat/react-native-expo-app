import * as React from "react";
import { View, Text, StyleSheet,  } from "react-native";

export const BmiIndicator = () => (
    <>
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
    </>
);

const styles = StyleSheet.create({
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