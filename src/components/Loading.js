import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingVertical: 15
  }
})

export default function Loading(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carregando...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}