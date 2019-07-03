import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';

import Loading from '../../components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function LoadingScene(props) {
  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        <Loading />
      </Content>
    </Container>
  )
};