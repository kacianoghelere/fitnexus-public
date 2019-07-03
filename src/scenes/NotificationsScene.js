import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  Body,
  Container,
  Content,
  Header,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail,
  Title
} from 'native-base';

import { formatDateInterval } from '../util/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20
  },
  item: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 10
  }
});

class NotificationsScene extends Component {

  _renderRow = (notification) => {
    const date = new Date(parseInt(notification.timestamp));

    const interval = formatDateInterval(date);

    return (
      <ListItem avatar style={styles.item}>
        <Left>
          <Thumbnail source={{ uri: notification.userAvatar }} />
        </Left>
        <Body>
          <Text>{notification.userName}</Text>
          <Text note>Curtiu sua postagem</Text>
          <Text note>{interval}</Text>
        </Body>
        <Thumbnail
          source={{ uri: notification.pictureUrl }}
          square
        />
      </ListItem>
    );
  };

  render() {
    const { content } = this.props.notifications;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Notificações</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List
            dataArray={content}
            renderRow={this._renderRow}
          >
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ notifications }) => ({
  notifications
})

export default connect(mapStateToProps)(NotificationsScene);