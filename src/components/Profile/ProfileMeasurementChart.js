import React from 'react';
import PropTypes from 'prop-types';
import { VictoryAxis, VictoryLine, VictoryChart } from 'victory-native';

import { formatTimestamp } from '../../util';

function ProfileMeasurementChart({ data }) {
  const tickValues = data.map(({ timestamp }) => {
    return new Date(timestamp);
  });

  const [first,] = tickValues;
  const [, last] = tickValues;

  return (
    <VictoryChart scale={{ x: 'time', y: 'linear' }}>
      <VictoryAxis dependentAxis />
      <VictoryAxis
        tickCount={4}
        tickValues={tickValues}
        tickFormat={(x) => '.'}
        minDomain={first}
        maxDomain={last}
      />
      <VictoryLine
        data={data}
        x={({ timestamp }) => timestamp}
        y={({ value }) => parseFloat(value)}
      />
    </VictoryChart>
  )
}

ProfileMeasurementChart.propTypes = {
  data: PropTypes.array.isRequired
}

ProfileMeasurementChart.defaultProps = {
  data: []
};

export default ProfileMeasurementChart;