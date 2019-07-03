import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileSettingsContainer from '../../containers/Profile/ProfileSettingsContainer';
import { updateAuthenticatedUser, showUserProfile } from '../../store/actions';

class ProfileSettingsScene extends Component {

  render() {
    const {
      authentication,
      updateAuthenticatedUser,
      showUserProfile
    } = this.props;

    const { user } = authentication;

    return (
      <ProfileSettingsContainer
        showUserProfile={showUserProfile}
        user={user}
        updateAuthenticatedUser={updateAuthenticatedUser}
      />
    );
  }
}

const mapStateToProps = ({ authentication }) => ({
  authentication
});

const mapDispatchToProps = {
  updateAuthenticatedUser,
  showUserProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsScene);