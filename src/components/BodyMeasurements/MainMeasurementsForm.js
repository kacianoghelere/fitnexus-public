import React from 'react';
import { Form, H3 } from 'native-base';

import MeasurementInput from './MeasurementInput';

export default function MainMeasurementsForm({ evolution, inputAction, styles }) {
  const inputCommonProps = {
    inputAction,
    styles
  };

  const { neck, chest, waist, hip } = evolution;

  return (
    <Form style={styles.form}>
      <H3 style={styles.title}>Medidas principais</H3>
      <MeasurementInput
        {...inputCommonProps}
        label="Pescoço (cm)"
        property={{ name: 'neck', value: neck }}
      />
      <MeasurementInput
        {...inputCommonProps}
        label="Peito (cm)"
        property={{ name: 'chest', value: chest }}
      />
      <MeasurementInput
        {...inputCommonProps}
        label="Cintura (cm)"
        property={{ name: 'waist', value: waist }}
      />
      <MeasurementInput
        {...inputCommonProps}
        label="Quadril (cm)"
        property={{ name: 'hip', value: hip }}
      />
    </Form>
  );
}