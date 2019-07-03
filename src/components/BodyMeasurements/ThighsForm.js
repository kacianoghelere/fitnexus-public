import React from 'react';
import { Form, H3 } from 'native-base';

import MeasurementInput from './MeasurementInput';

export default function ThighsForm({ evolution, inputAction, styles }) {
  const inputCommonProps = {
    inputAction,
    styles
  };

  const { leftThigh, rightThigh } = evolution;

  return (
    <Form style={styles.form}>
      <H3 style={styles.title}>Coxas</H3>
      <MeasurementInput
        {...inputCommonProps}
        label="Esquerda (cm)"
        property={{ name: 'leftThigh', value: leftThigh }}
      />
      <MeasurementInput
        {...inputCommonProps}
        label="Direita (cm)"
        property={{ name: 'rightThigh', value: rightThigh }}
      />
    </Form>
  );
}