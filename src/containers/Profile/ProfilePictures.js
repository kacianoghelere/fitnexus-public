import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, FlatList, Image, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import { displayPicture } from '../../store/actions/';

const { width } = Dimensions.get('window');

const columns = 3;

const itemWidth = (width / columns);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    backgroundColor: '#eeeeee',
    height: itemWidth,
    width: itemWidth
  },
  image: {
    aspectRatio: 1,
    height: '100%',
    width: '100%'
  }
});

class ProfilePictures extends Component {

  static propTypes = {
    evolutions: PropTypes.array,
    user: PropTypes.object
  };

  static defaultProps = {
    evolutions: []
  };

  setDisplayedPicture (evolution) {
    const { displayPicture, user } = this.props;

    displayPicture({
      ...evolution,
      userAvatar: user.avatar,
      userName: user.name
    });
  }

  _renderItems = ({ item: evolution }) => (
    <TouchableHighlight
      style={styles.imageContainer}
      onPress={() => this.setDisplayedPicture(evolution)}
    >
      <Image
        source={{ uri: evolution.pictureUrl, cache: 'force-cache' }}
        style={styles.image}
      />
    </TouchableHighlight>
  );

  render () {
    return (
      <FlatList
        numColumns={columns}
        data={this.props.evolutions}
        keyExtractor={(item, index) => `${item.uid}-${index}`}
        renderItem={this._renderItems}
        scrollEnabled={false}
      />
    )
  }
}

const mapDispatchToProps = {
  displayPicture
};

export default connect((state) => ({}), mapDispatchToProps)(ProfilePictures);