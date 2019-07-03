import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Root } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';

import firebase from './config/firebase';
import { translateFirebaseError, showErrors } from './util';
import FitnexusRouter from './components/FitnexusRouter';
import {
  setAuthenticatedUser,
  setAuthenticatedUserByUid
} from './store/actions/authenticationActions';

class FitnexusApp extends Component {

  async componentDidMount () {
    try {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.setAuthenticatedUserByUid(user.uid);

          Actions.Main({ type: ActionConst.RESET });
        } else {
          this.props.setAuthenticatedUser(null);

          Actions.Welcome({ type: ActionConst.REPLACE });
        }
      });
    } catch (error) {
      showErrors('Erro ao autenticar conta' + translateFirebaseError(error));
    }
  }

  render () {
    return (
      <Root>
        <FitnexusRouter />
      </Root>
    );
  }
}

const mapDispatchToProps = {
  setAuthenticatedUser,
  setAuthenticatedUserByUid
};

export default connect(null, mapDispatchToProps)(FitnexusApp);