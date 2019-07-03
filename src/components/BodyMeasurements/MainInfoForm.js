import React from 'react';
import { Form, H3 } from 'native-base';

import MeasurementInput from './MeasurementInput';

export default function MainInfoForm({ evolution, inputAction, styles }) {
  const { height, bodyFat, weight } = evolution;

  const inputCommonProps = {
    inputAction,
    styles
  };

  return (
    <Form style={styles.form}>
      <H3 style={styles.title}>Informações gerais</H3>
      <MeasurementInput
        {...inputCommonProps}
        label="Altura (cm)"
        property={{ name: 'height', value: height }}
      />
      <MeasurementInput
        {...inputCommonProps}
        label="Cordura Corporal (%)"
        property={{ name: 'bodyFat', value: bodyFat }}
      />
      <MeasurementInput
        {...inputCommonProps}
        label="Peso (kg)"
        property={{ name: 'weight', value: weight }}
      />
    </Form>
  );
}