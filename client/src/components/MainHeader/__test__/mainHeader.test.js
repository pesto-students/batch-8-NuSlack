import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import MainHeader from '../index';

describe('<MainHeader />', () => {
  it('should match the snapshot', () => {
    const tree = shallow(<MainHeader />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
