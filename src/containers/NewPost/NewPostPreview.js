import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, View } from 'react-native';
import { Header, Container, Content, Right, Left, Button, Icon, Text, Spinner } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

import {
  addUserEvolution,
  refreshTimeline,
  resetNewPost,
  setNewPostMeasurement,
  setNewPostPictureUrl,
  uploadingNewPostPicture,
} from '../../store/actions';
import { BodyMeasurementsForm } from '../BodyMeasurements';
import { handleImagePicked } from '../../util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  preview: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    width: '100%'
  },
  previewImage: {
    aspectRatio: 1,
    backgroundColor: '#ddd',
    flexGrow: 1,
    flexShrink: 1,
    height: '100%',
    resizeMode: 'cover'
  },
  measurements: {
    flex: 1,
    width: '100%'
  }
});

class NewPostPreview extends Component {

  async onSubmit() {
    const { authentication, newPost } = this.props;

    this.props.uploadingNewPostPicture();

    const { downloadURL } = await handleImagePicked('pictures/', {
      uri: newPost.pictureUrl
    });

    if (downloadURL) {
      this.props.setNewPostPictureUrl(downloadURL);
    } else {
      throw 'O upload de imagem falhou, URL de retorno não encontrada';
    }

    await this.props.addUserEvolution(authentication.user, {
      ...newPost,
      pictureUrl: downloadURL
    });

    this.props.resetNewPost();

    this.props.refreshTimeline();

    Actions.Timeline();
  }

  render() {
    const { newPost } = this.props;

    return (
      <Container contentContainerStyle={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.setNewPostPictureUrl('')}
              disabled={newPost.uploading}
            >
              <Icon type="Feather" name="chevron-left" />
            </Button>
          </Left>
          <Right>
            <Button
              transparent
              onPress={this.onSubmit.bind(this)}
              disabled={newPost.uploading}
            >
              {newPost.uploading ? <Spinner color='black' /> : <Text>Enviar</Text>}
            </Button>
          </Right>
        </Header>
        <Content scrollEnabled={false} contentContainerStyle={styles.content}>
          <View style={styles.preview}>
            <Image
              source={{ uri: newPost.pictureUrl }}
              style={styles.previewImage}
            />
          </View>
          <ScrollView style={styles.measurements}>
            <BodyMeasurementsForm
              evolution={newPost}
              inputAction={this.props.setNewPostMeasurement}
              style={styles.measurements}
            />
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ authentication, newPost }) => ({
  authentication,
  newPost
});

const mapDispatchToProps = {
  resetNewPost,
  setNewPostMeasurement,
  setNewPostPictureUrl,
  addUserEvolution,
  uploadingNewPostPicture,
  refreshTimeline
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPostPreview);