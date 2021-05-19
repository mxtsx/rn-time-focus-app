import React from 'react';
import {Platform, StyleSheet, Text} from "react-native";
import {THEME} from "../../utils/theme";

export const CustomText = ({style, children, ...props}) => {
    return (
        <Text style={{...styles.text, ...style}} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Platform.OS === 'android' ? THEME.SECONDARY_COLOR : THEME.PRIMARY_COLOR
    }
})