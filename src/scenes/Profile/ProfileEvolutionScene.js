import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Body,
  Container,
  Content,
  Header,
  Left,
  Right,
  Subtitle,
  Title,
  Button,
  Icon
} from 'native-base';

import {
  ProfileMeasurementChart,
  ProfileMeasurementHistory
} from '../../components/Profile/';
import { translate } from '../../util';

class ProfileEvolutionScene extends Component {

  static propTypes = {
    evolutions: PropTypes.object
  };

  static defaultProps = {
    evolutions: {
      list: []
    }
  };

  getMeasurementEvolution (name) {
    const { list = [] } = this.props.evolutions;

    return list.map(({ timestamp, ...evolution }) => ({
      timestamp,
      value: evolution[name]
    }));
  }

  render () {
    const { measurement, profile } = this.props;

    const measurementHistory = this.getMeasurementEvolution(measurement);

    const chartHistory = measurementHistory.slice().reverse();

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="chevron-left" type="Feather" />
            </Button>
          </Left>
          <Body>
            <Title>{profile.name}</Title>
            <Subtitle>{translate(measurement)}</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content>
          <ProfileMeasurementChart data={chartHistory} />
          <ProfileMeasurementHistory data={measurementHistory} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({
  selectedUserEvolutions: evolutions,
  selectedUser: { user: profile }
}) => ({
  evolutions,
  profile
});

export default connect(mapStateToProps, null)(ProfileEvolutionScene);