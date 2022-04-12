import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Vibration,
  Platform,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { colours } from '../../utils/colours';
import { spacing } from '../../utils/sizes';

import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';

import { Timing } from './Timing';

const DEFAULT_TIME = 3 / 60;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  // iOS only has a fixed vibration period off about 400 milliseconds.
  // I set up an interval that calls the `Vibrate` method every second
  // After 10 seconds, clear the interval and stop the vibrating
  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  // `onEnd` causes the app to:
  // - Vibrate
  // - Reset the time to the default time
  // - Reset the progress bar to be full
  // - Pause the timer
  // - call the `onTimerEnd` function that empties the focus subject
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          onProgress={onProgress}
          minutes={minutes}
          onEnd={onEnd}
        />
      </View>

      <View style={styles.focusText}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <View style={{ paddingBottom: spacing.md }}>
        <ProgressBar
          color="#5E84E2"
          style={{ height: 10 }}
          progress={progress}
        />
      </View>

      <View style={styles.buttons}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttons}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>

      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: colours.white,
    textAlign: 'center',
  },

  focusText: {
    padding: spacing.xxxl,
  },

  task: {
    color: colours.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  buttons: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
  },

  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
