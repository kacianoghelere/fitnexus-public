import React from 'react'
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem,  Left, Right } from 'native-base';
import * as Placeholder from 'rn-placeholder';

const styles = StyleSheet.create({
  imageContainer: {
    aspectRatio: 1,
    justifyContent: 'center',
    width: '100%'
  }
});

export default function TimelinePostPlaceholder () {
  return (
    <Card>
      <CardItem bordered header>
        <Left>
          <Placeholder.Media
            animate="fade"
            color="#eeeeee"
            size={48}
            hasRadius
            onReady={false}
          />
          <Body>
            <Placeholder.Line
              animate="shine"
              color="#eeeeee"
              width="50%"
              textSize={13}
              onReady={false}
            />
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody style={styles.imageContainer}>
        <Placeholder.Box
          animate="fade"
          color="#eeeeee"
          height={350}
          width={350}
          onReady={false}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Placeholder.Line
            animate="shine"
            color="#eeeeee"
            width="50%"
            textSize={10}
            onReady={false}
          />
        </Left>
        <Body />
        <Right>
          <Placeholder.Line
            animate="shine"
            color="#eeeeee"
            width="50%"
            textSize={10}
            onReady={false}
          />
        </Right>
      </CardItem>
    </Card>
  );
}