import React from 'react'
import { Image } from 'react-native';

export default function CachedImage(props) {
  const source = { ...props.source, cache: 'force-cache' };

  const imageProps = { ...props, source };

  return <Image { ...imageProps } />;
}