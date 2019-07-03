import React, { Component } from 'react';
import { PixelRatio, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Router, Scene, Tabs } from 'react-native-router-flux';

import {
  refreshNotifications,
  showUserProfile
} from '../store/actions';
import BodyMeasurementsScene from '../scenes/BodyMeasurementsScene';
import LoadingScene from '../scenes/LoadingScene';
import NotificationsScene from '../scenes/NotificationsScene';
import PictureDisplayScene from '../scenes/PictureDisplayScene';
import NewPostScene from '../scenes/NewPostScene';
import {
  ProfileScene,
  ProfileEvolutionScene,
  ProfileSettingsScene,
  ProfileFollowersScene,
  ProfileFollowingScene
} from '../scenes/Profile';
import SearchScene from '../scenes/SearchScene';
import SignInScene from '../scenes/SignInScene';
import SignUpScene from '../scenes/SignUpScene';
import TimelineScene from '../scenes/TimelineScene';
import WelcomeScene from '../scenes/WelcomeScene';
import TabIcon from './TabIcon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    borderTopColor: 'grey',
    borderTopWidth: 1 / PixelRatio.get(),
    backgroundColor: 'ghostwhite',
    opacity: 0.9
  }
});

class FitnexusRouter extends Component {

  constructor(props) {
    super(props);

    this.handleTabsClicked = this.handleTabsClicked.bind(this);
  }

  handleTabsClicked({ jumpToIndex, scene }) {
    const {
      authentication: { user: { uid } },
      refreshNotifications,
      showUserProfile
    } = this.props;

    switch (scene.route.key) {
      case 'Notifications':
        refreshNotifications(uid);
        break;
      case 'Profile':
        showUserProfile(uid);
        break;
      default:
        console.log(scene.route.key, 'não tem tratamento especial');
        break;
    }

    jumpToIndex(scene.index);
  }

  generateModalScene (key, component, options = {}) {
    const props = {
      ...options,
      key,
      component
    };

    return <Scene { ...props } modal hideNavBar />;
  }

  generateTabbedScene (key, component, options = {}) {
    const props = {
      ...options,
      key,
      component
    };

    return <Scene {...props} icon={TabIcon} hideNavBar lazy />;
  }

  render() {
    return (
      <Router hideNavBar="true">
        <Scene hideNavBar>
          <Scene key="root">
            <Scene
              key="Loading"
              component={LoadingScene}
              title="Fitnexus"
              hideNavBar
              initial
            />
            <Scene
              key="Welcome"
              component={WelcomeScene}
              title="Fitnexus"
              hideNavBar
            />
            <Scene
              key="SignIn"
              component={SignInScene}
              title="Entrar"
              backTitle="Voltar"
            />
            <Scene
              key="SignUp"
              component={SignUpScene}
              title="Criar nova conta"
              backTitle="Voltar"
            />
          </Scene>
          <Tabs
            key="Main"
            tabBarStyle={styles.tabBar}
            default="Timeline"
            tabBarOnPress={this.handleTabsClicked}
            showLabel={false}
            type="reset"
          >
            <Scene
              key="Timeline"
              component={TimelineScene}
              title="Timeline"
              icon={TabIcon}
              iconName='home'
              hideNavBar
            />
            <Scene
              key="Search"
              component={SearchScene}
              title="Buscar"
              icon={TabIcon}
              iconName='search'
              hideNavBar
              lazy
            />
            <Scene
              key="NewPost"
              component={NewPostScene}
              title="Novo"
              icon={TabIcon}
              iconName='plus-circle'
              hideNavBar
              lazy
            />
            <Scene
              key="Notifications"
              component={NotificationsScene}
              title="Notificações"
              icon={TabIcon}
              iconName='bell'
              hideNavBar
              lazy
            />
            <Scene
              key="Profile"
              component={ProfileScene}
              icon={TabIcon}
              iconName="user"
              hideNavBar
              lazy
            />
            {/* {this.generateTabbedScene('Profile', ProfileScene, {
              iconName: 'user'
            })} */}
          </Tabs>
          {this.generateModalScene('BodyMeasurements', BodyMeasurementsScene)}
          {this.generateModalScene('ProfileSettings', ProfileSettingsScene)}
          {this.generateModalScene('ProfileEvolution', ProfileEvolutionScene, {
            path: 'evolution/:measurement'
          })}
          {this.generateModalScene('ProfileFollowers', ProfileFollowersScene)}
          {this.generateModalScene('ProfileFollowing', ProfileFollowingScene)}
          {this.generateModalScene('PictureDisplay', PictureDisplayScene)}
        </Scene>
      </Router>
    )
  }
}

const mapStateToProps = ({ authentication }) => ({
  authentication
});

const mapDispatchToProps = {
  refreshNotifications,
  showUserProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(FitnexusRouter);