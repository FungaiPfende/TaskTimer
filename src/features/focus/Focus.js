import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { colours } from '../../utils/colours';

import { RoundedButton } from '../../components/RoundedButton';

export const Focus = ({ addSubject, focusHistory }) => {
  const [focusItem, setFocusItem] = useState(null);

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>What would you like to focus on?</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          maxLength={50}
          value={focusItem}
          //Use `onSubmitEditing` to access the text value in the `TextInput`
          // and temporarily store that value in `tempItem`
          onSubmitEditing={({ nativeEvent: { text } }) => setFocusItem(text)}
        />
        <RoundedButton
          style={styles.addSubject}
          size={50}
          title="+"
          //When the button is pressed, `addSubject` is called and the value
          // is set to the to the `tempItem`
          onPress={() => addSubject(focusItem)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  titleContainer: {
    flex: 0.5,
    padding: spacing.md,
    justifyContent: 'center',
  },

  title: {
    color: colours.white,
    fontWeight: 'bold',
    padding: spacing.md,
    fontSize: fontSizes.lg,
  },

  textInput: {
    flex: 1,
    marginRight: 20,
  },

  addSubject: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});
