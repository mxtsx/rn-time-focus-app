import React, {useRef} from 'react';
import {TouchableArea} from "./TouchableArea";
import {Platform, StyleSheet, View} from "react-native";
import {CustomBoldText} from "./CustomBoldText";
import {THEME} from "../../utils/theme";
import * as Animatable from "react-native-animatable"
import {SIZES} from "../../utils/sizes";


export const CustomButton = ({children, onPress, color, style, disabled}) => {
    const pulseAnimRef = useRef()
    const onPressHandler = () => {
        pulseAnimRef.current.tada(800)
        onPress && onPress()
    }
    return (
        <Animatable.View ref={pulseAnimRef} style={{...style}}>
            <TouchableArea activeOpacity={0.8}
                           disabled={!!disabled}
                           onPress={onPressHandler}>
                <View style={{...styles.button, backgroundColor: color ? color : Platform.OS === 'android' ? THEME.SECONDARY_COLOR : THEME.PRIMARY_COLOR}}>
                    <CustomBoldText style={{...styles.buttonText, color: Platform.OS === 'android' ? THEME.PRIMARY_COLOR : THEME.SECONDARY_COLOR}}>
                        {children}
                    </CustomBoldText>
                </View>
            </TouchableArea>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: SIZES.spacing.sm,
        borderRadius: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        fontSize: SIZES.fontSizes.md,
        textAlign: 'center'
    }
})