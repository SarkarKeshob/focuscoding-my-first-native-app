import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RoundedButton from '../roundedButton/RoundedButton';
import { spacing } from '../../utils/sizes';
const TimerSection = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton
          onPress={() => onChangeTime(10)}
          size={75}
          title={'10'}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          onPress={() => {
            onChangeTime(15);
          }}
          size={75}
          title={'15'}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          onPress={() => {
            onChangeTime(20);
          }}
          size={75}
          title={'20'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    marginHorizontal: spacing.sm,
  },
});

export default TimerSection;
