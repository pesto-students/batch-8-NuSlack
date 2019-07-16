import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ProfileModal from '../index';

jest.mock('../index', () => () => <profile-modal />);

describe('<ProfileModal />', () => {
  it('should match the snapshot', () => {
    const tree = shallow(<profile-modal />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
