import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';

import { RoundedButton } from '../../components/RoundedButton';

const renderHistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, clearHistory }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        {focusHistory.length > 0 && (
          <>
            <Text style={styles.title}>Things I've focused on:</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={renderHistoryItem}
            />

            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => clearHistory()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status === 'Completed' ? 'green' : 'red',
    fontSize: fontSizes.md,
  }),

  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },

  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
