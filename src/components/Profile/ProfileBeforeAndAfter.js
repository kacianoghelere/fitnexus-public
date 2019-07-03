import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Col, Grid, Spinner, Text } from 'native-base';

import CachedImage from '../shared/CachedImage';

const styles = StyleSheet.create({
  beforeAndAfter: {
    aspectRatio: 1,
    backgroundColor: '#ccc',
    width: '100%',
  },
  centralized: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    color: '#888',
    padding: 15
  }
});

function ProfileBeforeAndAfter({ evolutions }) {
  if (!evolutions || !evolutions.length) {
    return <Spinner />;
  }

  const lastEvolution = evolutions[0];

  const firstEvolution = evolutions[evolutions.length - 1];

  return (
    <Grid>
      <Col style={styles.centralized}>
        <Text style={styles.text}>Antes</Text>
        <CachedImage
          source={{ uri: firstEvolution.pictureUrl }}
          style={styles.beforeAndAfter}
        />
      </Col>
      <Col style={styles.centralized}>
        <Text style={styles.text}>Agora</Text>
        <CachedImage
          source={{ uri: lastEvolution.pictureUrl }}
          style={styles.beforeAndAfter}
        />
      </Col>
    </Grid>
  );
}

ProfileBeforeAndAfter.propTypes = {
  evolutions: PropTypes.array.isRequired
}

ProfileBeforeAndAfter.defaultProps = {
  evolutions: []
};

export default ProfileBeforeAndAfter;