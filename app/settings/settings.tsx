import * as React from "react";
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, SafeAreaView, } from "react-native";
import { CustomText } from "../common/CustomText";
import Share from 'react-native-share';

const SettingActions = [ 
    {"id": "about", "name": "About Us"},
    { "id": "share", "name": "Share with Friends" }, 
    { "id": "rate", "name": "Rate Us" },
    { "id": "privacy", "name": "Privacy" },
]

const shareOptions = {
    title: 'Share via',
    message: 'Hey, I am inviting you in the fitness revolution.',
    url: 'some share url'
};

export const Settings = () => {

    const shareApp = async () => await Share.open(shareOptions) //Share.shareSingle(shareOptions);
    console.log(shareApp)

    return (<SafeAreaView style={styles.container}>
            <View style={{ borderBottomWidth: 2, borderBottomColor: "#eee", flex: 3 }}>
                <Avatar rounded
                    size="xlarge"
                    source={require('../images/logo.png')}
                    activeOpacity={0.7}
                    containerStyle={{ marginTop: 45, marginBottom: 25, alignSelf: 'center' }} />
            </View>
            <View style={{marginLeft: 20, marginRight: 20, flex: 3}}>
                {
                    SettingActions.map((l, i) => (
                        <ListItem
                            key={i}
                            title={l.name}
                            onPress={shareApp}
                            titleStyle={{color: '#072F49'}}
                            chevron={{color: '#072F49'}}
                            bottomDivider
                        />
                    ))
                }
            </View>
            <View style={{ flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <Icon
                name='sc-telegram'
                type='evilicon'
                containerStyle={{marginRight: 50, borderWidth: 2, backgroundColor: "#072F49", borderColor: "#eee", padding: 8, borderRadius: 55}}
                iconStyle={{fontSize: 50, color: "#BFBF06"}}
                />
                <Icon
                name='sc-facebook'
                type='evilicon'
                containerStyle={{borderWidth: 2, backgroundColor: "#072F49", borderColor: "#eee", padding: 8, borderRadius: 60}}
                iconStyle={{fontSize: 50, color: "#BFBF06"}}
                />
            </View>
            <View style={{ flex: 2,  padding: 10, alignItems: "center", justifyContent: "flex-end" }}>
                <CustomText> v1.0.0 </CustomText>
                <CustomText>Copyright MatchTalent.in 2020</CustomText>
            </View>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: "#fff"
    },
});