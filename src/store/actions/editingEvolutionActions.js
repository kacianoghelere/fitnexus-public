export const SET_EDITING_EVOLUTION_MEASUREMENT = 'SET_EDITING_EVOLUTION_MEASUREMENT';

export function setEditingEvolutionMeasurement(key, value) {// TODO: (current) Mudar a lógica dessa atualização
  return {
    type: SET_EDITING_EVOLUTION_MEASUREMENT,
    key,
    value
  };
}