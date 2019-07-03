import * as Actions from '../actions';
import editingEvolutionReducer from './editingEvolutionReducer';

it('sets single measuremnet correctly', () => {
  const oldState = { height: '20.00' };

  const action = {
    type: Actions.SET_EVOLUTION_MEASUREMENT,
    key: 'height',
    value: '32.00'
  };

  const newState = editingEvolutionReducer(oldState, action);

  expect(newState.height).toBe(action.value);
});