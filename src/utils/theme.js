import {Platform} from "react-native";

export const THEME = {
    PRIMARY_COLOR: Platform.OS === 'android' ? '#252250' : '#fff',
    SECONDARY_COLOR: Platform.OS === 'android' ? '#fff' : '#252250',
    PROGRESSBAR_COLOR: '#5E84E2'
}