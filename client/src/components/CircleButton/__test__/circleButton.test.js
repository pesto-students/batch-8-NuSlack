import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CircleButton from '../index';

describe('<CircleButton />', () => {
  it('should match the snapshot', () => {
    const tree = shallow(<CircleButton size="default" />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
