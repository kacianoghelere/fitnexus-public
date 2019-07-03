import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserListContainer } from '../../containers/Profile';

class ProfileFollowersScene extends Component {

  render () {
    const { selectedUser } = this.props;

    const { followers: userList, user } = selectedUser;

    const listProps = {
      title: 'Seguidores',
      user,
      userList
    };

    return <UserListContainer {...listProps} />;
  }
}

const mapStateToProps = ({ selectedUser }) => ({
  selectedUser
});

export default connect(mapStateToProps, null)(ProfileFollowersScene);