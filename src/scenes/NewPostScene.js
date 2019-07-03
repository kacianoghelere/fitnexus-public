import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import { addUserEvolution } from '../store/actions/evolutionActions';
import {
  setNewPostPictureUrl,
  uploadingNewPostPicture
} from '../store/actions/newPostActions';
import NewPostPreview from '../containers/NewPost/NewPostPreview';
import { Icon, Container, Content, Button } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centralized: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  actions: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.25)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  overlay: {
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row'
  }
});

class NewPostScene extends Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    pictureUri: ''
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({ hasCameraPermission: (status === 'granted') });
  }

  async snap () {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync({ quality: 0.01 });

      this.props.setNewPostPictureUrl(photo.uri);
    }
  }

  toggleCamera () {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }

  toggleFlashMode () {
    const { flashMode } = this.state;

    this.setState({
      flashMode: (flashMode === Camera.Constants.FlashMode.off)
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off,
    });
  }

  renderCamera() {
    const { flashMode } = this.state;

    const isFlashModeOn = flashMode === Camera.Constants.FlashMode.on;

    return (
      <Camera
        style={styles.container}
        type={this.state.type}
        ref={(ref) => { this.camera = ref }}
        ratio="1:1"
        autoFocus={Camera.Constants.AutoFocus.on}
      >
        <View style={styles.overlay}>
          <View style={styles.actions}>
            <Button
              transparent
              light
              style={styles.action}
              onPress={this.toggleCamera.bind(this)}
            >
              <Icon type="MaterialIcons" name="switch-camera" />
            </Button>
            <Button
              transparent
              bordered
              light
              large
              rounded
              style={styles.action}
              onPress={this.snap.bind(this)}
            >
              <Icon type="MaterialIcons" name="camera-alt" />
            </Button>
            <Button
              transparent
              light
              style={styles.action}
              onPress={this.toggleFlashMode.bind(this)}
            >
              <Icon
                type="MaterialIcons"
                name={isFlashModeOn ? 'flash-on' : 'flash-off' }
              />
            </Button>
          </View>
        </View>
      </Camera>
    );
  }

  render () {
    const { newPost } = this.props;

    if (this.state.hasCameraPermission === null) {
      return (
        <View style={styles.centralized}>
          <Text>Nenhuma câmera encontrada</Text>
        </View>
      );
    } else if (this.state.hasCameraPermission === false) {
      return (
        <View style={styles.centralized}>
          <Text>Sem permissão acesso à câmera</Text>
        </View>
      );
    } else {
      return (
        <Container>
          <Content
            contentContainerStyle={styles.container}
            scrollEnabled={false}
          >
            {newPost.pictureUrl ? <NewPostPreview /> : this.renderCamera()}
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = ({ authentication, newPost }) => ({
  authentication,
  newPost
});

const mapDispatchToProps = {
  setNewPostPictureUrl,
  addUserEvolution,
  uploadingNewPostPicture
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPostScene);