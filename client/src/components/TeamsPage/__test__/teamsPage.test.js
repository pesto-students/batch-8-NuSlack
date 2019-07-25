import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TeamsPage from '../index';

describe('<TeamsPage /> shallow', () => {
  it('should match the snapshot', () => {
    const tree = shallow(<TeamsPage />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
