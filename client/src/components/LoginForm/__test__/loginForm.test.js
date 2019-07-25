import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import LoginForm from '../index';

describe('<LoginForm />', () => {
  it('should match the snapshot', () => {
    const tree = shallow(<LoginForm />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
