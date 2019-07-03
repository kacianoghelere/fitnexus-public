import React from 'react';
import { Input, Item, Label } from "native-base";

export default function MeasurementInput({
  inputAction,
  label,
  property,
  styles
}) {
  return (
    <Item style={styles.item} fixedLabel>
      <Label>{label}</Label>
      <Input
        name={property.name}
        keyboardType="numeric"
        value={property.value}
        onChangeText={(value) => inputAction(property.name, value)}
        style={styles.input}
      />
    </Item>
  )
}