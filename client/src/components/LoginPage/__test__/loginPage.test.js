import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import LoginPage from '../index';

describe('<LoginPage />', () => {
  it('should match the snapshot', () => {
    const tree = shallow(<LoginPage />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
