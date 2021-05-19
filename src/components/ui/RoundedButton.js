import React, {useRef} from 'react';
import {TouchableArea} from "./TouchableArea";
import {Platform, StyleSheet, View} from "react-native";
import {CustomBoldText} from "./CustomBoldText";
import {THEME} from "../../utils/theme";
import * as Animatable from "react-native-animatable"

export const RoundedButton = ({style, textStyle, size = 125, children, onPress, ...props}) => {
    const pulseAnimRef = useRef()
    const onPressHandler = () => {
        pulseAnimRef.current.tada(800)
        onPress && onPress()
    }
    return (
        <Animatable.View ref={pulseAnimRef}>
        <TouchableArea onPress={onPressHandler}>
            <View style={{...styles(size).radius, ...style}}>
                <CustomBoldText style={{...styles.text, ...textStyle}}>
                    {children}
                </CustomBoldText>
            </View>
        </TouchableArea>
        </Animatable.View>
    );
};

const styles = (size) => StyleSheet.create({
    radius: {
        borderRadius: size/2,
        borderWidth: 1,
        borderColor: Platform.OS === 'android' ? THEME.SECONDARY_COLOR : THEME.PRIMARY_COLOR,
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    text: {
        color: Platform.OS === 'android' ? THEME.SECONDARY_COLOR : THEME.PRIMARY_COLOR,
        fontSize: size / 3
    }
})