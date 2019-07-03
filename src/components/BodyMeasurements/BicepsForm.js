import React from 'react';
import { Form, H3 } from 'native-base';

import MeasurementInput from './MeasurementInput';

export default function BicepsForm({ evolution, inputAction, styles }) {
  const inputCommonProps = {
    inputAction,
    styles
  };

  const { leftBiceps, rightBiceps } = evolution;

  return (
    <Form style={styles.form}>
      <H3 style={styles.title}>Bíceps</H3>
      <MeasurementInput
        {...inputCommonProps}
        label="Esquerdo (cm)"
        property={{ name: 'leftBiceps', value: leftBiceps }}
      />
      <MeasurementInput
        {...inputCommonProps}
        label="Direito (cm)"
        property={{ name: 'rightBiceps', value: rightBiceps }}
      />
    </Form>
  );
}