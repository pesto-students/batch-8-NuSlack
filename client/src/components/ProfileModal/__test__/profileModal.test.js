import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ChatComponent from '../index';

describe('<ProfileModal />', () => {
    it('should match the snapshot', () => {
        const tree = shallow(<ChatComponent />);
        expect(toJson(tree)).toMatchSnapshot();
    });
});
