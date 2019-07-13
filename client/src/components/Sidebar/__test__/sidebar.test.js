import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Sidebar from '../index';

describe('<Sidebar />', () => {
  it('should match the snapshot', () => {
    // FIXME
    const tree = shallow(<Sidebar size="default" />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
