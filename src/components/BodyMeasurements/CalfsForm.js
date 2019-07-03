import React from 'react';
import { Form, H3 } from 'native-base';

import MeasurementInput from './MeasurementInput';

export default function CalfsForm({ evolution, inputAction, styles }) {
  const inputCommonProps = {
    inputAction,
    styles
  };

  const { leftCalf, rightCalf } = evolution;

  return (
    <Form style={styles.form}>
      <H3 style={styles.title}>Panturrilhas</H3>
      <MeasurementInput
        {...inputCommonProps}
        label="Esquerda (cm)"
        property={{ name: 'leftCalf', value: leftCalf }}
      />
      <MeasurementInput
        {...inputCommonProps}
        label="Direita (cm)"
        property={{ name: 'rightCalf', value: rightCalf }}
      />
    </Form>
  );
}