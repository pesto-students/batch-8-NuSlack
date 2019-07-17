import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import { useApi } from '../index';

function HookWrapper(props) {
  const hook = props.hook ? props.hook() : undefined;
  return <div hook={hook} />;
}

HookWrapper.propTypes = {
  hook: PropTypes.func,
};

HookWrapper.defaultProps = {
  hook: undefined,
};

describe('`useApi` hook', () => {
  it('should render', () => {
    const wrapper = shallow(<HookWrapper />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should set init data', () => {
    const someAsyncCall = async () => {};
    let wrapper = shallow(<HookWrapper hook={() => useApi(someAsyncCall, null)} />);

    let { hook } = wrapper.find('div').props();
    let [data, loadData, loading] = hook;
    expect(data).toEqual(null);
    expect(loading).toEqual(false);
    expect(typeof loadData).toBe('function');

    wrapper = shallow(<HookWrapper hook={() => useApi(someAsyncCall, 'some-initial-data')} />);

    // destructuring objects - {} should be inside brackets - () to avoid syntax error
    ({ hook } = wrapper.find('div').props());
    [data, loadData, loading] = hook;
    expect(data).toEqual('some-initial-data');
  });

  it('should update the data if async is called by `loadData`', async () => {
    const someAsyncCall = async () => Promise.resolve('resolved-data');
    const wrapper = shallow(<HookWrapper hook={() => useApi(someAsyncCall, null)} />);

    let { hook } = wrapper.find('div').props();
    let [data, loadData, loading] = hook;

    await loadData();

    ({ hook } = wrapper.find('div').props());
    [data, loadData, loading] = hook;

    expect(data).toEqual('resolved-data');
    expect(typeof loadData).toBe('function');
    expect(loading).toEqual(false);
  });
});
