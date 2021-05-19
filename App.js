import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Focus} from "./src/screens/focus/Focus";
import {THEME} from "./src/utils/theme";
import {Timer} from "./src/screens/timer/Timer";
import {SIZES} from "./src/utils/sizes";
import {FocusHistory} from "./src/screens/focus/FocusHistory";
import {STATUSES} from "./src/utils/status";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null)
  const [focusHistory, setFocusHistory] = useState([])

  const addFocusHistorySubjectWithState = (subject, status, id) => {
    setFocusHistory([...focusHistory, {subject, status, id}])
  }

  const onClear = () => {
    setFocusHistory([])
  }

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory))
    } catch (e) {
      console.log(e)
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory')
      if(history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history))
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadFocusHistory()
  }, [])

  useEffect(() => {
    saveFocusHistory()
  }, [focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject
          ? <Timer focusSubject={focusSubject}
                   clearSubject={() => {
                     addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELED, new Date().toString())
                     setFocusSubject(null)
                   }}
                   onTimerEnd={() => {
                     addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE, new Date().toString())
                     setFocusSubject(null)
                   }} />
          :
          <>
            <Focus onPress={setFocusSubject}/>
            <FocusHistory focusHistory={focusHistory}
                          onClear={onClear} />
          </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? THEME.PRIMARY_COLOR : THEME.SECONDARY_COLOR,
    paddingVertical: Platform.OS === 'android' ? SIZES.spacing.xl : SIZES.spacing.md
  },
});
