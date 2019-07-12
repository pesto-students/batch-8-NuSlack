const user = localStorage.getItem('userDetails');

const initialState = {
  user: user ? JSON.parse(user) : {},
  channels: [],
  allUsers: [],
  error: null,
};

export default initialState;
