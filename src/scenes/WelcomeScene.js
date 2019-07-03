import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Container, Content, Text, Button, H1, H2 } from 'native-base';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    right: 0,
    top: 0,
    width: '100%'
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15
  },
  imageBackground: {
    backgroundColor: 'black',
    flex: 1,
    position: 'relative'
  },
  welcomeText: {
    alignItems: 'center',
    flex: 3,
    justifyContent: 'center',
    margin: 0
  },
  actions: {
    flex: 1
  },
  textShadow: {
    color: "#ffffff",
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {
      height: 2,
      width: 0
    },
    textShadowRadius: 1
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10
  },
  text: {
    marginBottom: 10,
    marginTop: 10
  },
  button: {
    marginTop: 20
  }
});

export default function WelcomeScene(props) {
  return (
    <Container contentContainerStyle={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../assets/bg.jpg')}
      >
        <Content contentContainerStyle={styles.content}>
          <View style={styles.welcomeText}>
            <H1 style={[styles.title, styles.textShadow]}>
              Seja bem vindo ao Fitnexus!
              </H1>
            <H2 style={[styles.text, styles.textShadow]}>
              Com o Fitnexus, você poderá alcançar aquele corpo que tanto sonhou!
              </H2>
          </View>
          <View style={styles.actions}>
            <Button
              light
              block
              onPress={() => Actions.SignUp()}
              style={styles.button}
            >
              <Text>Quero criar uma nova conta</Text>
            </Button>
            <Button
              bordered
              light
              block
              onPress={() => Actions.SignIn()}
              style={styles.button}
            >
              <Text>Já tenho uma conta</Text>
            </Button>
          </View>
        </Content>
      </ImageBackground>
      </Container>
  );
};