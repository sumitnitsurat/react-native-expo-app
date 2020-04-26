import * as React from "react";
import { Avatar } from 'react-native-elements';
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, SafeAreaView,  } from "react-native";


export const Settings = () => {
    return (        <SafeAreaView style={styles.container}>
        <ScrollView>
        <Avatar rounded 
        size="xlarge"
        icon={{name: 'male', color: '#4b4a67', type: 'font-awesome'}}
        activeOpacity={0.7}
        containerStyle={{flex: 4, marginTop: 25, alignSelf: 'center'}} />
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