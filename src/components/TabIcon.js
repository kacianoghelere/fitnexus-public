import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 30,
    width: 30
  }
});

export default function TabIcon({ iconName, tintColor }) {
  return (
    <View style={styles.iconContainer}>
      <Icon
        type="Feather"
        style={[styles.icon, {color: tintColor}]}
        name={iconName}
        size={18}
      />
    </View>
  );
}