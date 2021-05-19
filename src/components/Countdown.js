import React, {useEffect, useState} from 'react';
import {StyleSheet} from "react-native";
import {CustomBoldText} from "./ui/CustomBoldText";
import {SIZES} from "../utils/sizes";

const minutesToMillis = (min) => min * 1000 * 60
const formatTime = time => time < 10 ? `0${time}` : time

export const Countdown = ({minutes = 20, isPaused,
                              onProgress, onEnd}) => {
    const [millis, setMillis] = useState(minutesToMillis(minutes))
    const minute = Math.floor(millis/1000/60) % 60
    const seconds = Math.floor(millis/1000) % 60
    const interval = React.useRef(null)
    const countDown = () => {
        setMillis((time) => {
            if(time < 1000) {
                clearInterval(interval.current)
                return time - time
            }
            return time - 1000
        })
    }

    useEffect(() => {
        setMillis(minutesToMillis(minutes))
    }, [minutes])

    useEffect(() => {
        if (isPaused) {
            if(interval.current) clearInterval(interval.current)
            return
        }
        if(millis === 0) {
            onEnd()
        }
        interval.current = setInterval(countDown, 1000)
        onProgress(millis/minutesToMillis(minutes))
        return () => clearInterval(interval.current)
    }, [isPaused, millis])

    return (
        <CustomBoldText style={styles.text}>
            {formatTime(minute)}:{formatTime(seconds)}
        </CustomBoldText>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: SIZES.fontSizes.xxl,
        padding: SIZES.spacing.lg,
        backgroundColor: 'rgba(94, 132, 226, 0.3)',
        textAlign: 'center'
    }
})