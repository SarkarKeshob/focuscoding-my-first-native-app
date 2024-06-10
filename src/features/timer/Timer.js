import Reaact, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { spacing, sizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import TimerSection from '../../components/timerSection/TimerSection';
import CountDown from '../../components/countDown/CountDown';
import RoundedButton from '../../components/roundedButton/RoundedButton';
import { useKeepAwake } from 'expo-keep-awake';

const initialMinute = 1;

const Timer = ({ focusSubject, setFocusSubject, handleFocusHistory }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minute, setMinute] = useState(initialMinute);
  const handlePressed = () => {
    setIsStarted(!isStarted);
  };
  const handleProgress = (progressValue) => {
    setProgress(progressValue);
  };
  const handleChangeMinutes = (min) => {
    setMinute(min);
    setIsStarted(false);
    setProgress(1);
  };
  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate, 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };
  const onTaskEnd = () => {
    setMinute(initialMinute);
    setIsStarted(false);
    setProgress(1);
    handleFocusHistory(focusSubject, true);
    setFocusSubject(null);
    vibrate();
  };
  const handleClearTask = () => {
    setIsStarted(false);
    setProgress(1);
    handleFocusHistory(focusSubject, false);
    setFocusSubject(null);
  };
  return (
    <View style={styles.container}>
      <CountDown
        minutes={minute}
        isPaused={!isStarted}
        onProgress={handleProgress}
        onCountdownEnd={onTaskEnd}
      />

      <View>
        <Text style={styles.titleText}>Focusing On .</Text>
        <Text style={styles.taskText}>{focusSubject}</Text>
      </View>
      <View>
        <ProgressBar style={styles.progress} progress={progress} />
      </View>
      <View style={styles.buttonWrapper}>
        <TimerSection onChangeTime={handleChangeMinutes} />
      </View>
      <View style={styles.taskButtons}>
        <View style={styles.commandButton}>
          {isStarted ? (
            <RoundedButton title={'Pause'} onPress={handlePressed} />
          ) : (
            <RoundedButton title={'Start'} onPress={handlePressed} />
          )}
        </View>
        <View style={styles.clearCurrentTask}>
          <RoundedButton title={'End'} onPress={handleClearTask} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    justifyContent: 'center',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  progress: {
    height: sizes.sm,
    marginTop: spacing.sm,
    color: '#5E84E2',
  },
  titleText: {
    color: colors.baseWhite,
    fontSize: sizes.md,
    textAlign: 'center',
  },
  taskText: {
    color: colors.baseWhite,
    fontSize: sizes.lg,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  commandButton: {
    width: 'fit',
    marginTop: spacing.md,
    marginHorizontal: spacing.sm,
  },
  clearCurrentTask: {
    marginTop: spacing.md,
    marginHorizontal: spacing.sm,
  },
  taskButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Timer;
