import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Body, Title, Left, Right } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';

import TimelinePost from '../components/timeline/TimelinePost';
import TimelinePostPlaceholder from '../components/timeline/TimelinePostPlaceholder';
import EmptyTimeline from '../components/timeline/EmptyTimeline';
import { refreshTimeline, showUserProfile, togglePostLike } from '../store/actions';

class TimelineScene extends Component {

  constructor(props) {
    super(props);

    this.state = { refreshing: false };
  }

  _keyExtractor = ({ uid, userUid }, index) => `${uid}-${userUid}-${index}`;

  _renderItem = ({ item: post }) => {
    const postProps = {
      key: `${post.userUid}-${post.uid}`,
      post
    };

    return <TimelinePost {...postProps} />;
  };

  getSortedContent() {
    const { timeline: { content, loading } } = this.props;

    if (loading) {
      return null;
    }

    return content.sort((a, b) => b.timestamp - a.timestamp, []);
  }

  _onRefresh() {
    const { authentication: { user: { uid } } } = this.props;

    this.props.refreshTimeline(uid);
  }

  getRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.props.timeline.loading}
        onRefresh={this._onRefresh.bind(this)}
      />
    );
  }

  renderContent() {
    const { loaded, loading } = this.props.timeline;

    if (loading) {
      return <TimelinePostPlaceholder />;
    }

    const content = this.getSortedContent();

    if (loaded && !content.length) {
      return <EmptyTimeline />;
    }

    return (
      <FlatList
        data={content}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Left />
          <Body>
            <Title style={{ fontStyle: 'italic' }}>FITNEXUS</Title>
          </Body>
          <Right />
        </Header>
        <Content padder refreshControl={this.getRefreshControl()}>
          {this.renderContent()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ authentication, timeline }) => ({
  authentication,
  timeline
});

const mapDispatchToProps = {
  refreshTimeline,
  showUserProfile,
  togglePostLike
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineScene);