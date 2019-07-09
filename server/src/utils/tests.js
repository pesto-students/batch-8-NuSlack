const parse = object => JSON.parse(JSON.stringify(object));
const mockResponse = () => {
  const res = {};
  res.status = () => res;
  res.send = result => result;
  return res;
};

export { parse, mockResponse };
