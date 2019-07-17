import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import AddChannelForm from '../index';

describe('<AddChannelForm />', () => {
  it('should match the snapshot', () => {
    const tree = shallow(<AddChannelForm closeModal={() => {}} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
