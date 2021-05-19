import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from "react-native";
import {CustomBoldText} from "../../components/ui/CustomBoldText";
import {CustomText} from "../../components/ui/CustomText";
import {SIZES} from "../../utils/sizes";
import {STATUSES} from "../../utils/status";
import {THEME} from "../../utils/theme";
import {RoundedButton} from "../../components/ui/RoundedButton";

const HistoryItem = (itemData) => {
    return(
        <CustomText style={styles.historyItem(itemData.item.status)}>
            {itemData.item.subject}
        </CustomText>
    )
}

export const FocusHistory = ({focusHistory, onClear}) => {
    return (
        <>
            <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
                {!!focusHistory.length &&
                <>
                    <CustomBoldText style={styles.title}>Things we've focused on:</CustomBoldText>
                    <FlatList style={{width: '100%', height: '100%'}}
                              contentContainerStyle={{flex: 1, alignItems: 'center'}}
                              data={focusHistory}
                              renderItem={HistoryItem}/>
                </>}
            </SafeAreaView>
            {!!focusHistory.length &&
            <View style={styles.clearContainer}>
                <RoundedButton size={75} onPress={() => onClear()}>Clear List</RoundedButton>
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: SIZES.fontSizes.lg,
        paddingVertical: 15
    },
    historyItem: (status) => ({
        color: status === STATUSES.COMPLETE ? THEME.SECONDARY_COLOR : 'red',
        fontSize: SIZES.fontSizes.lg
    }),
    clearContainer: {
        alignItems: 'center',
        padding: SIZES.spacing.md
    }
})