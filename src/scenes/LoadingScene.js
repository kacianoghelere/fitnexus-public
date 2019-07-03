import React from 'react';
import { StyleSheet } from 'react-native';

import { Container, Content, Spinner } from 'native-base';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f9faf9',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  logo: {
    height: 225,
    width: 350
  }
});

export default function LoadingScene(props) {
  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        {/* <Image
          source={require('../../assets/fitnexus.png')}
          style={styles.logo}
        /> */}
        <Spinner color='black' />
      </Content>
    </Container>
  )
};