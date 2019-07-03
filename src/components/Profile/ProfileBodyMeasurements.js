import React, { Component } from 'react';
import { List, ListItem, Text, Body, Right, Icon, Left } from 'native-base';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import { translate } from '../../util';

export default class ProfileBodyMeasurements extends Component {

  static propTypes = {
    currentMeasurements: PropTypes.object.isRequired
  };

  nonDetailedMeasurements = ['height'];

  renderDetail(key, value) {
    const translatedDetailName = translate(key);

    if (this.nonDetailedMeasurements.includes(key)) {
      return (
        <ListItem key={key}>
          <Left>
            <Text>{translatedDetailName}</Text>
          </Left>
          <Right>
            <Text>{value}</Text>
          </Right>
        </ListItem>
      );
    }

    return (
      <ListItem
        key={key}
        icon
        button
        onPress={() => Actions.ProfileEvolution({ measurement: key })}
      >
        <Body>
          <Text>{translatedDetailName}</Text>
        </Body>
        <Right>
          <Text>{value}</Text>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  renderGroup(groupName, detailsData) {
    const details = Object.entries(detailsData).map(([key, value]) => {
      return this.renderDetail(key, value);
    });

    const translatedGroupName = translate(groupName);

    return (
      <React.Fragment key={groupName}>
        <ListItem itemDivider>
          <Text style={{ fontWeight: 'bold' }}>{translatedGroupName}</Text>
        </ListItem>
        {details}
      </React.Fragment>
    );
  }

  render() {
    const { currentMeasurements } = this.props;

    const baseMeasurements ={
      generalInfo: {
        height: currentMeasurements.height,
        bodyFat: currentMeasurements.bodyFat,
        weight: currentMeasurements.weight
      },
      mainMeasurements: {
        neck: currentMeasurements.neck,
        chest: currentMeasurements.chest,
        waist: currentMeasurements.waist,
        hip: currentMeasurements.hip
      },
      biceps: {
        leftBiceps: currentMeasurements.leftBiceps,
        rightBiceps: currentMeasurements.rightBiceps
      },
      thighs: {
        leftThigh: currentMeasurements.leftThigh,
        rightThigh: currentMeasurements.rightThigh
      },
      calfs: {
        leftCalf: currentMeasurements.leftCalf,
        rightCalf: currentMeasurements.rightCalf
      }
    }

    const groups = Object.entries(baseMeasurements).map(([group, details]) => {
      return this.renderGroup(group, details);
    });

    return <List>{groups}</List>;
  }
}