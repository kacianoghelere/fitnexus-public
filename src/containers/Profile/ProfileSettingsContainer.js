import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Spinner,
  Text,
  Title,
  View
} from 'native-base';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import {
  translateFirebaseError,
  showErrors,
  handleImagePicked,
  pickImage,
  takePhoto
} from '../../util';

const styles = StyleSheet.create({
  avatar: {
    aspectRatio: 1,
    borderRadius: 128 / 2,
    width: 128,
    margin: 15
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20
  },
  profileHeader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15
  },
  changeAvatar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    marginLeft: 5,
    marginRight: 5
  },
  input: {
    textAlign: 'left'
  }
});

export default class ProfileSettingsContainer extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    const { user } = props;

    this.state = { ...user, uploadingAvatar: false };

    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.popScene = this.popScene.bind(this);
  }

  popScene() {
    Actions.pop();
  }

  handleUserUpdate () {
    const { showUserProfile, updateAuthenticatedUser, user } = this.props;

    updateAuthenticatedUser(this.state);

    showUserProfile(user.uid);
  }

  async takeNewPhoto () {
    try {
      const result = await takePhoto();

      this.setState({ uploadingAvatar: true });

      const uploadData = await handleImagePicked('avatars/', result);

      if (uploadData) {
        this.setState({ avatar: uploadData.downloadURL });
      }

      this.setState({ uploadingAvatar: false });
    } catch (error) {
      showErrors(translateFirebaseError(error));
    }
  }

  async pickImageFromCameraRoll () {
    try {
      const result = await pickImage();

      this.setState({ uploadingAvatar: true });

      const uploadData = await handleImagePicked('avatars/', result);

      if (uploadData) {
        this.setState({ avatar: uploadData.downloadURL });
      }

      this.setState({ uploadingAvatar: false });
    } catch (error) {
      showErrors(translateFirebaseError(error));
    }
  }

  renderAvatar () {
    if (this.state.uploadingAvatar) {
      return (
        <View style={styles.avatar}>
          <Spinner color='black' />
        </View>
      );
    }

    return <Image source={{ uri: this.state.avatar }} style={styles.avatar} />
  }

  render () {
    const { user } = this.props;

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={this.popScene}
              disabled={this.state.uploadingAvatar}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Dados pessoais</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={this.handleUserUpdate}
              disabled={this.state.uploadingAvatar}
            >
              <Text>Salvar</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.profileHeader}>
            {this.renderAvatar()}
            <View style={styles.changeAvatar}>
              <Button
                transparent
                iconLeft
                onPress={this.takeNewPhoto.bind(this)}
                disabled={this.state.uploadingAvatar}
              >
                <Icon type="Feather" name="camera" />
                <Text>Tirar foto</Text>
              </Button>
              <Button
                transparent
                iconLeft
                onPress={this.pickImageFromCameraRoll.bind(this)}
                disabled={this.state.uploadingAvatar}
              >
                <Icon type="Feather" name="image" />
                <Text>Escolher foto</Text>
              </Button>
            </View>
          </View>
          <Form>
            <Item stackedLabel>
              <Label>Nome</Label>
              <Input
                name="userName"
                value={user.name}
                onChangeText={(name) => this.setState({ name })}
                style={styles.input}
              />
            </Item>
            <Item stackedLabel>
              <Label>Slogan (opcional)</Label>
              <Input
                name="userQuote"
                value={user.quote}
                onChangeText={(quote) => this.setState({ quote })}
                style={styles.input}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}