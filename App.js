import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';

import { colours } from './src/utils/colours';
import { spacing } from './src/utils/sizes';

import { Focus as FocusInput } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';

import { Timer } from './src/features/timer/Timer';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  // Spread the `focusHistory` to the new array to make sure
  // the data is preserved across renders. Add an object to the array
  // that saves the `focusSubject` and the session's `status`
  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  const STATUSES = {
    COMPLETE: 'Completed',
    CANCELLED: 'Cancelled',
  };

  // When the timer ends, add the `focusSubject` to the `focusHistory`
  // with the COMPLETED status.
  const handleTimerEnd = () => {
    addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
    setFocusSubject(null);
  };

  // When the task is cancelled, add the `focusSubject` to the
  // `focusHistory` with teh CANCELLED status.
  const handleClearSubject = () => {
    addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
    setFocusSubject(null);
  };

  const clearHistory = () => {
    setFocusHistory([]);
  };

  //Asynchronously save the `focusHistory` to the app's state
  const saveFocusHistory = async () => {
    try {
      //setItem(key: string, value: string)
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.error(e);
    }
  };

  // Load all the saved history thats been saved.
  const loadFocusHistory = async () => {
    try {
      //getItem(key: string)
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Load all the focus history on mount (when the app first loads)
  useEffect(() => {
    loadFocusHistory();
  }, []);

  //Everytime `focusHistory` changes, save the new value
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  console.log(focusHistory);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={handleTimerEnd}
          clearSubject={handleClearSubject}
        />
      ) : (
        <>
          <FocusInput addSubject={setFocusSubject} />
          <FocusHistory
            focusHistory={focusHistory}
            clearHistory={clearHistory}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.darkBlue,
    paddingTop: spacing.md,
  },
});
