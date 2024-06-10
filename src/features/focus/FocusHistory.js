import React from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, View } from 'react-native';
import { spacing } from '../../utils/sizes';
import { sizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import RoundedButton from '../../components/roundedButton/RoundedButton';

const FocusHistory = ({ focusHistory, onClearHistory }) => {
  const handleClearHistory = () => {
    onClearHistory();
  };
  return (
    <SafeAreaView style={styles.historyContiner}>
      {focusHistory.length > 0 && (
        <>
          <Text style={styles.historyTitle}>Things we have focused on.</Text>
          <FlatList
            data={focusHistory}
            renderItem={({ item, index }) => (
              <Text style={styles.focusText(item.status)}>
                {JSON.stringify(item.subject)}
              </Text>
            )}
          />
          <View style={styles.clearHistoryButton}>
            <RoundedButton
              size={60}
              title={'Clear'}
              onPress={handleClearHistory}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  historyContiner: {
    flex: 0.7,
    width: 'fit',
    marginHorizontal: 'auto',
  },
  historyTitle: {
    color: colors.baseWhite,
    fontSize: sizes.lg,
    fontWeight: 'bold',
  },
  focusText: (status) => ({
    color: status ? 'green' : 'red',
    fontSize: sizes.md,
    textTransform: 'uppercase',
    marginHorizontal: 'auto',
  }),
  clearHistoryButton: {
    width: 'fit',
    marginHorizontal: 'auto',
  },
});

export default FocusHistory;
