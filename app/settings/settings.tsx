import * as React from "react";
import { Avatar } from 'react-native-elements';
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, SafeAreaView,  } from "react-native";
import {CustomText} from "../common/CustomText";

export const Settings = () => {
    return (<SafeAreaView style={styles.container}>
        <View style={{borderBottomWidth: 2, borderBottomColor: "#eee"}}>
            <ScrollView>
                <Avatar rounded 
                size="xlarge"
                icon={{name: 'male', color: '#4b4a67', type: 'font-awesome'}}
                activeOpacity={0.7}
                containerStyle={{flex: 4, marginTop: 25, marginBottom: 25, alignSelf: 'center'}} />
            </ScrollView>
        </View>
        <View style={{padding: 10, alignItems: "center"}}>
            <CustomText> v1.0.0 </CustomText>
            <CustomText>Copyright MatchTalent.in 2020</CustomText>
        </View>
        </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'stretch', 
        justifyContent: 'space-around', 
        backgroundColor: "#fff"
    },
  });