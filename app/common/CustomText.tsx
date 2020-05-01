import * as React from "react";
import {Text, StyleSheet, Platform} from "react-native";

export const CustomText = ({ children, style }: {children: any, style?: any}) => (<Text style={[styles.text, style]}> {children}</Text>)

const styles = StyleSheet.create({
    text: {
        ...Platform.select({
            ios: {
              fontFamily: 'Helvetica',
            },
            android: {
                fontFamily: 'Roboto',
            },
          }),
    }
});