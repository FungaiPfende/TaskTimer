import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { colours } from '../utils/colours';
import { spacing, fontSizes } from '../utils/sizes';

const minsToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
  minutes = 3 / 60,
  isPaused,
  onProgress,
  onEnd,
}) => {
  const [millis, setMillis] = useState(null);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  const interval = useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        // When the timer has ended, clear the interval and call the `onEnd()`
        // function to end the .....
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      // report progress
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minsToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minsToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colours.white,
    fontSize: fontSizes.xxxl,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
    fontWeight: 'bold',
    borderRadius: 20,
  },
});
