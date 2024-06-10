import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { spacing } from '../../utils/sizes';
import { sizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import RoundedButton from '../../components/roundedButton/RoundedButton';

const Focus = ({ addSubject }) => {
  const [tmpItem, setTmpItem] = useState(null);
  const handlePressed = () => {
    addSubject(tmpItem);
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>What would you like to focus on? </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write a job"
            onSubmitEditing={({ nativeEvent }) => {
              setTmpItem(nativeEvent.text);
            }}
          />
          <RoundedButton title="+" size={sizes.xxxxl} onPress={handlePressed} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: spacing.base,
  },
  titleContainer: {
    marginTop: spacing.xxxl,
    justifyContent: 'center',
  },
  titleText: {
    color: colors.baseWhite,
    fontWeight: 'bold',
    fontSize: sizes.md,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginRight: spacing.sm,
    flex: 1,
  },
});

export default Focus;
