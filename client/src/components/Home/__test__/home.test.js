import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Home from '../index';

describe('<Home />', () => {
  it('should match the snapshot', () => {
    const tree = shallow(<Home />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
