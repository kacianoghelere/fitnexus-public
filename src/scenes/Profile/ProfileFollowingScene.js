import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserListContainer } from '../../containers/Profile';

class ProfileFollowingScene extends Component {

  render() {
    const { selectedUser } = this.props;

    const { followeds: userList, user } = selectedUser;

    const listProps = {
      title: 'Seguindo',
      user,
      userList
    };

    return <UserListContainer {...listProps} />;
  }
}

const mapStateToProps = ({ selectedUser }) => ({
  selectedUser
});

export default connect(mapStateToProps, null)(ProfileFollowingScene);