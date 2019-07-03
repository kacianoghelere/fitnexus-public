import React, { Component } from 'react';
import {
  ActionSheet,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  ScrollableTab,
  Tab,
  Tabs,
  Text,
  Title
} from 'native-base';
import PropTypes from 'prop-types';
import { ActionConst, Actions } from 'react-native-router-flux';

import firebase from '../../config/firebase';
import ProfilePictures from './ProfilePictures';
import {
  ProfileBodyMeasurements,
  ProfileHeader
} from '../../components/Profile/';

export default class ProfileContainer extends Component {

  static propTypes = {
    evolutions: PropTypes.array,
    followers: PropTypes.array,
    followeds: PropTypes.array,
    user: PropTypes.object,
  };

  static defaultProps = {
    evolutions: [],
    followers: [],
    followeds: [],
    isCurrentUser: false
  };

  MENU_SETTINGS = 0;
  MENU_MEASUREMENTS = 1;
  MENU_SIGN_OUT = 2;

  constructor (props) {
    super(props);

    this.followNavigation = this.followNavigation.bind(this);
    this.renderRightHeaderOptions = this.renderRightHeaderOptions.bind(this);
    this.showOptions = this.showOptions.bind(this);
  }

  followNavigation (buttonIndex) {
    switch (buttonIndex) {
      case this.MENU_SETTINGS:
        Actions.ProfileSettings({ type: ActionConst.PUSH });
        break;
      case this.MENU_MEASUREMENTS:
        Actions.BodyMeasurements({ type: ActionConst.PUSH });
        break;
      case this.MENU_SIGN_OUT:
        firebase.auth().signOut();
        break;
      default:
        break;
    }
  }

  showOptions () {
    const options = [
      'Alterar meus dados',
      'Alterar medidas corporais',
      'Sair',
      'Cancelar'
    ];

    const configuration = {
      destructiveButtonIndex: 2,
      cancelButtonIndex: 3,
      options,
      title: 'Opções'
    };

    ActionSheet.show(configuration, this.followNavigation);
  }

  renderRightHeaderOptions () {
    const { authentication, user } = this.props;

    const { followedIds, user: authUser } = authentication;

    if (authUser && user.uid === authUser.uid) {
      return (
        <Button transparent onPress={this.showOptions}>
          <Icon type="Feather" name="settings" />
        </Button>
      );
    }

    if (followedIds.includes(user.uid)) {
      return (
        <Button
          transparent
          onPress={() => this.props.toggleFollow(user.uid, false)}
        >
          <Icon type="Feather" name="user-x" />
        </Button>
      );
    }

    return (
      <Button
        transparent
        onPress={() => this.props.toggleFollow(user.uid, true)}
      >
        <Icon type="Feather" name="user-check" />
      </Button>
    );
  }

  getUserCurrentMeasurements () {
    const {
      authentication: auth,
      currentEvolution,
      evolutions,
      user
    } = this.props;

    if (auth &&auth.user && auth.user.uid === user.uid) {
      return currentEvolution;
    } else if (evolutions && evolutions.length) {
      return evolutions[0];
    }

    return {};
  }

  render () {
    const {
      evolutions,
      followeds,
      followers,
      user,
    } = this.props;

    const headerProps = {
      evolutions,
      followeds,
      followers,
      user
    };

    const containerProps = {
      currentMeasurements: this.getUserCurrentMeasurements()
    };

    return (
      <Container>
        <Header style={{ paddingTop: 20 }}>
          <Left>
            <Title style={{ fontSize: 26 }}>{user.name}</Title>
          </Left>
          <Right>
            {this.renderRightHeaderOptions()}
          </Right>
        </Header>
        <Content>
          <ProfileHeader {...headerProps} />
          <Tabs renderTabBar={() => <ScrollableTab />}>
            <Tab heading="Fotos">
              <ProfilePictures
                evolutions={evolutions}
                user={user}
              />
            </Tab>
            <Tab heading="Medidas">
              <ProfileBodyMeasurements {...containerProps} />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}