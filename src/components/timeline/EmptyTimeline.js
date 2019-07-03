import React from 'react'
import { StyleSheet, Text } from 'react-native';
import { Card, CardItem, Icon } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';

const text = {
  color: '#aaa',
  fontSize: 25
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%'
  },
  text,
  icon: {
    ...text,
    fontSize: 30
  },
  title: {
    ...text,
    fontWeight: 'bold'
  }
});

export default function EmptyTimeline () {
  return (
    <Card>
      <CardItem
        cardBody
        button
        onPress={() => Actions.NewPost({ type: ActionConst.REPLACE })}
        style={styles.container}
      >
        <Icon type='SimpleLineIcons' name='plus' style={styles.icon} />
        <Text style={styles.title}>Clique aqui para enviar</Text>
        <Text style={styles.title}>sua primeira postagem!</Text>
      </CardItem>
    </Card>
  );
}