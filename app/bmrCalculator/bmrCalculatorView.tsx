import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions,ScrollView } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {BmrCalculator} from "./bmrCalculator";
import {BmiCalculator} from "./bmiCalculator";

const initialLayout = { width: Dimensions.get('window').width };

const renderTabBar = props => (
    <TabBar
      {...props}
      style={{ backgroundColor: '#04637E' }}
      activeColor="#BFBF06"
    />
  );


export const BmrCalculatorView = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'BMR' },
        { key: 'second', title: 'Macros' },
        { key: 'third', title: 'BMI' },
    ]);

    const renderScene = SceneMap({
        first: BmrCalculator,
        second: BmiCalculator,
        third: BmiCalculator,
      });

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView >
            <TabView
            navigationState={{ index, routes }}
            swipeEnabled={false}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={initialLayout}
        />

        </ScrollView>
    </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'stretch', 
        justifyContent: 'space-around',
        backgroundColor: "#fff"
    },
    thumb: {
        height: 30, width: 30, borderRadius: 50, borderWidth: 10, borderColor: "#072F49", backgroundColor: "#fff" 
    }
  });