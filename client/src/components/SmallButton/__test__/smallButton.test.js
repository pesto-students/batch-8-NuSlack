import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SmallButton from '../index';

describe('<SmallButton /> shallow', () => {
    it('should match the snapshot', () => {
        const tree = shallow(<SmallButton />);
        expect(toJson(tree)).toMatchSnapshot();
    });
});


describe('<SmallButton /> shallow', () => {
    it('should match the snapshot', () => {
        const tree = shallow(<SmallButton />);
        expect(toJson(tree)).toMatchSnapshot();
    });
});

