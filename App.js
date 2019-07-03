import React, { Component } from 'react';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';

import store from './src/store';
import FitnexusApp from './src/FitnexusApp';

console.disableYellowBox = true;
console.ignoredYellowBox = true;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });

    this.setState({ loading: false });
  }

  render() {
    return (
      <Provider store={store}>
        <FitnexusApp />
      </Provider>
    );
  }
}