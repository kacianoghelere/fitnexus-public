import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View } from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Subtitle,
  Spinner,
  Text,
  Thumbnail,
  Title
} from 'native-base';

import { showUserProfile } from '../../store/actions';

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})

class UserListContainer extends Component {

  renderRow({ avatar, name, uid }) {
    return (
      <ListItem
        avatar
        style={{ padding: 10 }}
        button
        onPress={() => this.props.showUserProfile(uid)}
      >
        <Left>
          <Thumbnail source={{ uri: avatar, cache: 'force-cache' }} />
        </Left>
        <Body>
          <Text>{name}</Text>
        </Body>
      </ListItem>
    );
  };

  render() {
    const { user, title, userList } = this.props;

    if (!user) {
      return (
        <View style={styles.loading}>
          <Spinner color="black" />
        </View>
      )
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="chevron-left" type="Feather" />
            </Button>
          </Left>
          <Body>
            <Title>{user.name}</Title>
            <Subtitle>{title}</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content>
          <List
            dataArray={userList}
            renderRow={this.renderRow.bind(this)}
          />
        </Content>
      </Container>
    )
  }
}

export default connect(null, { showUserProfile })(UserListContainer);