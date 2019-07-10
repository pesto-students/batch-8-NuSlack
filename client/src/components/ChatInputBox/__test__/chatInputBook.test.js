import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ChatInputBox from '../index';

describe('<ChatInputBox />', () => {
  it('should match the snapshot', () => {
    const tree = shallow(<ChatInputBox />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
