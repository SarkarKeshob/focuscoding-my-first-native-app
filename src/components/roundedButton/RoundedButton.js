import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
const RoundedButton = ({
  title = '',
  size = 125,
  buttonStyle = {},
  textStyle = {},
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, buttonStyle]}
      onPress={onPress}>
      <Text style={[styles(size).text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      height: size,
      width: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#fff',
      borderWidth: 2,
    },

    text: {
      color: '#fff',
      fontSize: size / 3,
    },
  });

export default RoundedButton;
