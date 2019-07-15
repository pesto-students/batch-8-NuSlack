import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import HomeLayout from '../index';

describe('<HomeLayout />', () => {
  it('should match the snapshot', () => {
    const tree = shallow(<HomeLayout />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
