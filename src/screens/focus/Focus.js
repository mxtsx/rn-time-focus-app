import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import {TextInput} from "react-native-paper";
import {CustomBoldText} from "../../components/ui/CustomBoldText";
import {RoundedButton} from "../../components/ui/RoundedButton";
import {SIZES} from "../../utils/sizes";

export const Focus = ({onPress}) => {
    const [value, setValue] = useState('')
    const onPressHandler = () => {
        if(value.trim()) {
            onPress(value)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <CustomBoldText style={styles.label}>What would you like to focus on?</CustomBoldText>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput value={value} onChangeText={setValue} style={styles.input} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <RoundedButton size={50} onPress={() => onPressHandler()}>+</RoundedButton>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelContainer: {
        flex: 0.5,
        padding: SIZES.fontSizes.md,
        justifyContent: 'center'
    },
    label: {
        fontSize: SIZES.fontSizes.lg
    },
    formContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: SIZES.spacing.lg
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        flex: 1,
        marginRight: SIZES.spacing.lg,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    button: {
        width: '40%'
    }
})