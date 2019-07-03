import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Icon, Input, Item, Label, Text, Button } from 'native-base';

import firebase from '../config/firebase';
import { setLoginEmail, setLoginPassword } from '../store/actions';
import { showErrors, showInfo, translateFirebaseError } from '../util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20
  },
  button: {
    marginTop: 20
  },
  item: {
    marginLeft: 5,
    marginRight: 5
  }
});

class SignInScene extends Component {

  constructor (props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit () {
    const { email, password } = this.props.login;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (!user) {
          throw 'auth/user-not-found';
        }

        showInfo('Autenticado');
      })
      .catch((error) => showErrors(translateFirebaseError(error)));
  }

  render () {
    const { setLoginEmail, setLoginPassword, login } = this.props;

    const { email, password } = login;

    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Form>
            <Item style={styles.item} stackedLabel>
              <Label>E-mail</Label>
              <Input
                name="email"
                keyboardType="email-address"
                value={email}
                onChangeText={(email) => setLoginEmail(email)}
              />
            </Item>
            <Item style={styles.item} stackedLabel>
              <Label>Senha</Label>
              <Input
                name="password"
                secureTextEntry={true}
                value={password}
                onChangeText={(password) => setLoginPassword(password)}
              />
            </Item>
            <Button
              dark
              block
              iconLeft
              onPress={this.onSubmit}
              style={styles.button}
            >
              <Icon type="SimpleLineIcons" name='login' />
              <Text>Entrar</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  login
});

const mapDispatchToProps = {
  setLoginEmail,
  setLoginPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScene);