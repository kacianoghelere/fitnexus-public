import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { H2, Icon, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

import { formatDateInterval, pluralize } from '../util/';
import dictionary from '../util/dictionary';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    flex: 1,
    flexDirection: 'column'
  },
  content: {
    alignItems: 'center',
    flex: 6,
    justifyContent: 'center',
    width
  },
  image: {
    aspectRatio: 1,
    flex: 1,
    resizeMode: 'cover',
    maxWidth: width,
    width
  },
  swiper: {
    margin: 0,
    padding: 0
  },
  details: {
    alignItems: 'center',
    aspectRatio: 1,
    flex: 1,
    justifyContent: 'center',
    maxWidth: width,
    width
  },
  scroll: {
    width
  },
  picture: {
    aspectRatio: 1,
    flex: 1,
  },
  spaceBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    width: '100%'
  },
  centerBetween: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  text: {
    color: '#eee'
  }
});

class PictureDisplayScene extends Component {

  static propTypes = {
    pictureDisplayed: PropTypes.object
  }

  close() {
    Actions.pop();
  }

  renderDetails() {
    const { pictureDisplayed } = this.props;

    return Object.entries(pictureDisplayed).map(([key, value]) => {
      if (dictionary.hasOwnProperty(key)) {
        return (
          <View style={styles.spaceBetween} key={key}>
            <Text style={styles.text}>{dictionary[key]}</Text>
            <Text style={styles.text}>{value}</Text>
          </View>
        );
      }
    })
  }

  render() {
    const { pictureDisplayed } = this.props;

    const {
      likees = [],
      pictureUrl,
      timestamp,
      userName
    } = pictureDisplayed;

    const date = new Date(parseInt(timestamp));

    const interval = formatDateInterval(date);

    const likes = pluralize(likees.length, ' curtidas', ' curtida');

    return (
      <View style={styles.container}>
        <View style={styles.centerBetween}>
          <H2 style={styles.text}>{userName}</H2>
          <Button
            light
            large
            transparent
            onPress={this.close.bind(this)}
            style={{ margin: 0 }}
          >
            <Icon type="Feather" name="x" />
          </Button>
        </View>
        <View style={styles.content}>
          <Swiper
            style={styles.swiper}
            showsButtons={false}
            index={0}
            width={width}
            loop={false}
          >
            <Image
              source={{ uri: pictureUrl }}
              style={styles.image}
            />
            <View style={styles.details} scrollEnabled>
              <ScrollView contentContainerStyle={styles.scroll}>
                {this.renderDetails()}
              </ScrollView>
            </View>
          </Swiper>
        </View>
        <View style={styles.centerBetween}>
          <Text style={styles.text}>{likes}</Text>
          <Text style={styles.text}>{interval}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ pictureDisplayed }) => ({
  pictureDisplayed
})

export default connect(mapStateToProps)(PictureDisplayScene);