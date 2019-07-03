import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Left, Text, Right } from 'native-base';

import { formatTimestamp } from '../../util';

function ProfileMeasurementHistory({ data }) {
  const renderRow = (evolution) => (
    <ListItem>
      <Left>
        <Text>{formatTimestamp(evolution.timestamp)}</Text>
      </Left>
      <Right>
        <Text>{evolution.value}</Text>
      </Right>
    </ListItem>
  );

  const listProps = {
    dataArray: data,
    renderRow
  }

  return <List { ...listProps } />;
}

ProfileMeasurementHistory.propTypes = {
  data: PropTypes.array.isRequired
}

ProfileMeasurementHistory.defaultProps = {
  data: []
};

export default ProfileMeasurementHistory;