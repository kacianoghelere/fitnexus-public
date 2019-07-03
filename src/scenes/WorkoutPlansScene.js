import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  ActionSheet,
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Thumbnail,
  Title
} from 'native-base';

import firebase from '../config/firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20
  }
});

class WorkoutPlansScene extends Component {

  render() {
    const user = firebase.auth().currentUser;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Planos de Treino</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>TESTE</Text>
        </Content>
      </Container>
    );
  }
}

export default connect()(WorkoutPlansScene);