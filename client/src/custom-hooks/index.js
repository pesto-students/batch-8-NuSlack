import { useState } from 'react';

const useApi = (action, initial) => {
  const [data, setData] = useState({
    value: initial,
    loading: false,
  });

  const loadData = async (...args) => {
    setData({
      value: data.value,
      loading: true,
    });
    const res = await action(...args);
    setData({
      value: res,
      loading: false,
    });
  };

  return [data.value, loadData, data.loading];
};

const someOtherHook = () => {};

export { useApi, someOtherHook };
