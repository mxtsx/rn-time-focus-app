import React from 'react';
import {StyleSheet, View} from "react-native";
import {RoundedButton} from "../../components/ui/RoundedButton";

export const Timing = ({onChangeTime}) => {
    return (
        <>
            <View style={styles.timingButton}>
                <RoundedButton size={75} onPress={() => onChangeTime(10)}>10</RoundedButton>
            </View>
            <View style={styles.timingButton}>
                <RoundedButton size={75} onPress={() => onChangeTime(15)}>15</RoundedButton>
            </View>
            <View style={styles.timingButton}>
                <RoundedButton size={75} onPress={() => onChangeTime(20)}>20</RoundedButton>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    timingButton: {
        flex: 1,
        alignItems: 'center'
    }
})