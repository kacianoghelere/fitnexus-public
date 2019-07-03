import React, { Component } from 'react'
import { connect } from 'react-redux';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Body, Button, Card, CardItem, Icon, Left, Right, Text } from 'native-base';

import { displayPicture, showUserProfile, togglePostLike } from '../../store/actions/';
import { formatDateInterval } from '../../util/';
import CachedImage from '../../components/shared/CachedImage';

const styles = StyleSheet.create({
  touchableHighlight: {
    aspectRatio: 1,
    flex: 1,
    width: '100%'
  },
  avatar: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: '#ccc',
    borderRadius: (48 / 2),
    justifyContent: 'center',
    width: 48
  },
  image: {
    aspectRatio: 1,
    flex: 1,
    resizeMode: 'cover',
    width: '100%'
  },
  imageContainer: {
    backgroundColor: '#ddd'
  }
});

class TimelinePost extends Component {

  _isPostLikee = () => {
    const {
      authentication: { user },
      post: { likees = [] }
    } = this.props;

    return user ? likees.includes(user.uid) : false;
  }

  _handleLike = () => {
    const { authentication: { user }, post, togglePostLike } = this.props;

    if (user) {
      togglePostLike(user.uid, post.uid, !this._isPostLikee());
    }
  }

  setDisplayedPicture () {
    const { displayPicture, post } = this.props;

    displayPicture(post);
  }

  render () {
    const { post, showUserProfile } = this.props;

    const date = new Date(parseInt(post.timestamp));

    const interval = formatDateInterval(date);

    return (
      <Card>
        <CardItem
          bordered
          header
          button
          onPress={() => showUserProfile(post.userUid)}
        >
          <Left>
            <CachedImage
              source={{ uri: post.userAvatar }}
              style={styles.avatar}
            />
            <Body>
              <Text>{post.userName}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody style={styles.imageContainer}>
          <TouchableHighlight
            onPress={this.setDisplayedPicture.bind(this)}
            style={styles.touchableHighlight}
          >
            <CachedImage
              source={{ uri: post.pictureUrl }}
              style={styles.image}
            />
          </TouchableHighlight>
        </CardItem>
        <CardItem>
          <Left>
            <Button dark transparent onPress={this._handleLike}>
              <Icon
                active={this._isPostLikee()}
                name="thumbs-up"
              />
              <Text>{post.likees.length}</Text>
            </Button>
          </Left>
          <Body />
          <Right>
            <Text>{interval}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication });

const mapDispatchToProps = {
  displayPicture,
  showUserProfile,
  togglePostLike
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelinePost);