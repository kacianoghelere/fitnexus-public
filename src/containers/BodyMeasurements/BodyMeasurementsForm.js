import React from 'react'
import { ScrollView, StyleSheet } from 'react-native';

import {
  MainInfoForm,
  MainMeasurementsForm,
  BicepsForm,
  ThighsForm,
  CalfsForm
} from '../../components/BodyMeasurements';

const styles = StyleSheet.create({
  item: {
    marginLeft: 5,
    marginRight: 5
  },
  scroll: {
    padding: 15
  },
  form: {
    paddingVertical: 15
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5
  },
  input: {
    textAlign: 'right'
  }
});

export default function BodyMeasurementsForm({ evolution, inputAction }) {
  const formProps = {
    evolution,
    inputAction,
    styles
  };

  return (
    <ScrollView style={styles.scroll}>
      <MainInfoForm {...formProps} />
      <MainMeasurementsForm {...formProps} />
      <BicepsForm {...formProps} />
      <ThighsForm {...formProps} />
      <CalfsForm {...formProps} />
    </ScrollView>
  );
}