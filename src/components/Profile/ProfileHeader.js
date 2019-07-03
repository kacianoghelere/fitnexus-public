import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Grid, Col, Text } from 'native-base';
import Swiper from 'react-native-swiper';
import { Actions, ActionConst } from 'react-native-router-flux';

import ProfileBeforeAndAfter from './ProfileBeforeAndAfter';
import ProfileHeaderAvatar from './ProfileHeaderAvatar';
import ProfileHeaderBadge from './ProfileHeaderBadge';

const styles = StyleSheet.create({
  beforeAndAfter: {
    aspectRatio: 1,
    backgroundColor: '#ccc',
    width: 128,
  },
  columnDirection: {
    flexDirection: 'column'
  },
  rowDirection: {
    flexDirection: 'row'
  },
  centralized: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileHeader: {
    ...this.centralized,
    padding: 10
  },
  profileDetails: {
    padding: 10
  },
  swiper: {
    height: 250,
    margin: 0,
    padding: 0
  }
});

export default class ProfileHeader extends Component {

  static propTypes = {
    evolutions: PropTypes.array,
    user: PropTypes.object,
    followers: PropTypes.array,
    followeds: PropTypes.array,
  };

  static defaultProps = {
    evolutions: [],
    followers: [],
    followeds: []
  };

  render() {
    const { evolutions, user, followers, followeds } = this.props;

    return (
      <Swiper
        style={styles.swiper}
        showsButtons={false}
        loop={false}
      >
        <View style={{ flex: 1 }}>
          <View style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, flex: 2 }}>
            <Grid>
              <Col>
                <View style={styles.profileHeader}>
                  <ProfileHeaderAvatar
                    avatar={user.avatar}
                    name={user.name}
                  />
                </View>
              </Col>
              <Col style={[styles.centralized, styles.rowDirection, { paddingTop: 50 }]}>
                <ProfileHeaderBadge
                  count={followers.length}
                  label="Seguidores"
                  callback={() => Actions.ProfileFollowers({ type: ActionConst.PUSH })}
                />
                <ProfileHeaderBadge
                  count={followeds.length}
                  label="Seguindo"
                  callback={() => Actions.ProfileFollowing({ type: ActionConst.PUSH })}
                />
              </Col>
            </Grid>
          </View>
          { user.quote ? (
            <View style={[styles.centralized, { flex: 1 }]}>
              <View style={styles.profileDetails}>
                <Text>{user.quote}</Text>
              </View>
            </View>
          ) : null }
        </View>
        <ProfileBeforeAndAfter evolutions={evolutions} />
      </Swiper>
    );
  }
}
