import React, {useState} from 'react';
import {Platform, StyleSheet, Vibration, View} from "react-native";
import {CustomBoldText} from "../../components/ui/CustomBoldText";
import {CustomText} from "../../components/ui/CustomText";
import {SIZES} from "../../utils/sizes";
import {Countdown} from "../../components/Countdown";
import {RoundedButton} from "../../components/ui/RoundedButton";
import {ProgressBar} from "react-native-paper";
import {THEME} from "../../utils/theme";
import {Timing} from "./Timing";
import {useKeepAwake} from "expo-keep-awake";

export const Timer = ({focusSubject, onTimerEnd, clearSubject}) => {
    useKeepAwake()

    const [minutes, setMinutes] = useState(10)
    const [progress, setProgress] = useState(1)
    const [isStarted, setIsStarted] = useState(false)

    const vibrate = () => {
        if(Platform.OS === 'ios') {
            const interval = setInterval(() => Vibration.vibrate(), 1000)
            setTimeout(() => clearInterval(interval, 10000))
        } else {
            Vibration.vibrate([1000, 2000])
        }
    }

    const onProgress = (progress) => {
        setProgress(progress)
    }

    const changeTime = (min) => {
        setMinutes(min)
        setProgress(1)
        setIsStarted(false)
    }

    const onEnd = () => {
        vibrate()
        setMinutes(1)
        setProgress(1)
        setIsStarted(false)
        onTimerEnd()
    }

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown minutes={minutes}
                           isPaused={!isStarted}
                           onEnd={onEnd}
                           onProgress={onProgress}/>
            </View>
            <View style={styles.textWrapper}>
                <CustomText style={styles.title}>Focusing on:</CustomText>
                <CustomBoldText style={styles.task}>{focusSubject}</CustomBoldText>
            </View>
            <View style={{height: 10, width: '100%'}}>
                <ProgressBar progress={progress}
                             color={THEME.PROGRESSBAR_COLOR} />
            </View>
            <View style={styles.buttonContainer}>
                <Timing onChangeTime={changeTime}/>
            </View>
            <View style={styles.controlButtons}>
                <View style={styles.buttonContainer}>
                    <RoundedButton
                        onPress={() => setIsStarted(prev => !prev)}>{!isStarted || !progress ? 'Start' : 'Pause'}</RoundedButton>
                </View>
                <View style={styles.buttonContainer}>
                    <RoundedButton size={70} onPress={clearSubject}>Reset</RoundedButton>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countdown: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textWrapper: {
        paddingVertical: SIZES.spacing.lg
    },
    title: {
        textAlign: 'center'
    },
    task: {
        textAlign: 'center'
    },
    buttonContainer: {
        flex: 0.3,
        paddingVertical: SIZES.spacing.lg,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    controlButtons: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})