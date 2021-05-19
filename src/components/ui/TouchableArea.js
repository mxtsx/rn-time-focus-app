import React from 'react';
import {Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";

export const TouchableArea = ({style, children, ...props}) => {
    let Area = TouchableOpacity
    if (Platform.OS === 'android') {
        Area = TouchableNativeFeedback
    }
    return (
        <View style={{...style, overflow: 'hidden'}}>
            <Area {...props}
                  useForeground={true}
                  background={TouchableNativeFeedback.Ripple('#000', true)}>
                {children}
            </Area>
        </View>
    )
}