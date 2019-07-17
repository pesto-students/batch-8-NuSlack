import axios from 'axios';
import { serverConfig } from '../config';

const getUser = async username => axios.get(`${serverConfig.SERVER_BASE_URL}/users`, {
  params: {
    username,
  },
});

const anotherApi = () => {};

export { getUser, anotherApi };
