import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';

const styles = StyleSheet.create({
  columnDirection: {
    flexDirection: 'column'
  },
  centralized: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  label: {
    color: '#999999',
    fontSize: 13
  }
});

function ProfileHeaderBadge({ count, label, callback }) {
  return (
    <Button
      full
      dark
      transparent
      onPress={count > 0 ? callback : () => { }}
      style={[styles.centralized, styles.columnDirection]}
    >
      <Text style={styles.number}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </Button>
  );
}

ProfileHeaderBadge.propTypes = {
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
}

ProfileHeaderBadge.defaultProps = {
  count: 0,
  label: '',
  callback: () => {}
};

export default ProfileHeaderBadge;