import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';

import ProfileBeforeAndAfter from './ProfileBeforeAndAfter';

it('renders without crashing', () => {
  const evolutions = [
    { pictureUrl: 'https://bit.ly/2JxY8tN' }
  ];

  const rendered = renderer.create(
    <ProfileBeforeAndAfter
      evolutions={evolutions}
    />
  );

  expect(rendered.toJSON()).toBeTruthy();

  const componentTree = rendered.toTree();

  const { defaultProps, propTypes } = componentTree.type;

  expect(propTypes).toHaveProperty('evolutions');
  expect(propTypes.evolutions).toEqual(PropTypes.array.isRequired);

  expect(defaultProps).toHaveProperty('evolutions');

  expect(componentTree.props).toHaveProperty('evolutions');
  expect(componentTree.props.evolutions).toBeDefined();
  expect(componentTree.props.evolutions).toEqual(evolutions);
});