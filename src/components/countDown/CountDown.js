import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, sizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const minutesToMilis = (minutes) => minutes * 1000 * 60;
const formatTime = (time) => (time > 9 ? time : `0${time}`);
const CountDown = ({ minutes, isPaused, onProgress, onCountdownEnd }) => {
  const [milies, setMilies] = useState(null);
  useEffect(() => {
    setMilies(minutesToMilis(minutes));
  }, [minutes]);

  const minuteLeft = Math.floor((milies / 1000 / 60) % 60);
  const secondLeft = Math.floor((milies / 1000) % 60);
  const interval = useRef(null);
  const countDownFunc = () => {
    setMilies((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      } else {
        const timeLeft = time - 1000;
        return timeLeft;
      }
    });
  };
  useEffect(() => {
    if (isPaused) {
      if (interval) clearInterval(interval.current);
      return;
    } else {
      interval.current = setInterval(countDownFunc, 1000);
      return () => clearInterval(interval.current);
    }
  }, [isPaused]);

  useEffect(() => {
    onProgress(milies / minutesToMilis(minutes));
    if (milies === 0) {
      onCountdownEnd();
    }
  }, [milies]);

  return (
    <View style={styles.timerView}>
      <Text style={styles.timerText}>
        {formatTime(minuteLeft)}:{formatTime(secondLeft)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontSize: sizes.xxxxl,
    color: colors.baseWhite,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  timerView: {
    backgroundColor: 'rgba(5, 6, 149, 0.2)',
    marginBottom: spacing.xl,
    padding: spacing.md,
  },
});

export default CountDown;
