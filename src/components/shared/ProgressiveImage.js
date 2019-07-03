import React, { Component } from 'react';
import { Animated, View } from 'react-native';

export default class ProgressiveImage extends Component {

  constructor(props) {
    super(props);

    this.state = { thumbnailOpacity: new Animated.Value(0) };

    this.onLoad = this.onLoad.bind(this);
    this.onThumbnailLoad = this.onThumbnailLoad.bind(this);
  }

  onLoad (event) {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 0,
      duration: 250
    }).start()
  }

  onThumbnailLoad (event) {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: 250
    }).start();
  }

  render () {
    return (
      <View
        width={this.props.style.width}
        height={this.props.style.height}
        backgroundColor={'#ffffff'}
      >
        <Animated.Image
          resizeMode={'contain'}
          key={this.props.key}
          style={[
            {
              position: 'absolute'
            },
            this.props.style
          ]}
          source={this.props.source}
          onLoad={this.onLoad}
        />
        <Animated.Image
          resizeMode={'contain'}
          key={this.props.key}
          style={[
            {
              opacity: this.state.thumbnailOpacity
            },
            this.props.style
          ]}
          source={{ uri: this.props.thumbnail }}
          onLoad={this.onThumbnailLoad}
        />
      </View>
    )
  }
}