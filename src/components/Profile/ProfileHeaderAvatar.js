import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';

import { extractInitials } from '../../util';
import CachedImage from '../shared/CachedImage';

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: '#ccc',
    borderRadius: 128 / 2,
    justifyContent: 'center',
    margin: 10,
    width: 128,
  },
  avatarText: {
    fontSize: 28
  }
});

function ProfileHeaderAvatar({ avatar, name }) {
  if (avatar) {
    return (
      <CachedImage
        source={{ uri: avatar, cache: 'force-cache' }}
        style={styles.avatar}
      />
    )
  }

  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{extractInitials(name)}</Text>
    </View>
  );
}

ProfileHeaderAvatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

ProfileHeaderAvatar.defaultProps = {
  avatar: ''
};

export default ProfileHeaderAvatar;