import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Form, Icon, Input, Item, Label, Text } from 'native-base';

import firebase from '../config/firebase';
import {
  setRegistrationEmail,
  setRegistrationName,
  setRegistrationPassword
} from '../store/actions';
import { showErrors, showInfo, translateFirebaseError } from '../util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15
  },
  button: {
    marginTop: 20
  },
  item: {
    marginLeft: 5,
    marginRight: 5
  }
});

class SignUpScene extends Component {

  constructor (props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit () {
    const { email, password } = this.props.registration;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.resolveUser(user);
      })
      .catch((error) => {
        showErrors(translateFirebaseError(error));
      });
  }

  resolveUser ({ uid }) {
    const { email, name } = this.props.registration;

    const userRef = firebase.database().ref(`users/${uid}`);

    userRef.set({ email, name })
      .then(() => showInfo('Autenticado'))
      .catch((error) => showErrors(translateFirebaseError(error)));
  }

  render () {
    const {
      setRegistrationEmail,
      setRegistrationName,
      setRegistrationPassword,
      registration
    } = this.props;

    const { email, name, password } = registration;

    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Form>
            <Item style={styles.item} stackedLabel>
              <Label>Nome</Label>
              <Input
                name="name"
                value={name}
                onChangeText={(name) => setRegistrationName(name)}
              />
            </Item>
            <Item style={styles.item} stackedLabel>
              <Label>E-mail</Label>
              <Input
                name="email"
                keyboardType="email-address"
                value={email}
                onChangeText={(email) => setRegistrationEmail(email)}
              />
            </Item>
            <Item style={styles.item} stackedLabel>
              <Label>Senha</Label>
              <Input
                name="password"
                secureTextEntry={true}
                value={password}
                onChangeText={(password) => setRegistrationPassword(password)}
              />
            </Item>
          </Form>
          <Button
            dark
            block
            iconLeft
            onPress={this.onSubmit}
            style={styles.button}
          >
            <Icon type="SimpleLineIcons" name='plus' />
            <Text>Cadastrar</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ registration }) => ({
  registration
});

const mapDispatchToProps = {
  setRegistrationEmail,
  setRegistrationName,
  setRegistrationPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScene);