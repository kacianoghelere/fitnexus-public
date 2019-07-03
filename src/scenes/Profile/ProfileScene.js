import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resetSelectedUser, showUserProfile, toggleFollow } from '../../store/actions';
import ProfileContainer from '../../containers/Profile/ProfileContainer';
import LoadingContainer from '../../containers/shared/LoadingContainer';

class ProfileScene extends Component {

  componentWillUnmount() {
    this.props.resetSelectedUser();
  }

  isContentReady({ fetching, user }) {
    return !fetching && user;
  }

  render() {
    const {
      authentication,
      currentEvolution,
      evolutions: { list: evolutions },
      profile,
      toggleFollow
    } = this.props;

    const { followeds, followers, user } = profile;

    if (this.isContentReady(profile)) {
      const containerProps = {
        authentication,
        currentEvolution,
        evolutions,
        followeds,
        followers,
        toggleFollow,
        user
      };

      return <ProfileContainer { ...containerProps } />;
    }

    return <LoadingContainer />;
  }
}

const mapStateToProps = ({
  authentication,
  currentEvolution,
  selectedUser: profile,
  selectedUserEvolutions: evolutions
}) => ({
  authentication,
  currentEvolution,
  profile,
  evolutions
});

const mapDispatchToProps = {
  resetSelectedUser,
  showUserProfile,
  toggleFollow
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScene);