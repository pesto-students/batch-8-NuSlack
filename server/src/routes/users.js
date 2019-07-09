import { Router } from 'express';
import { getUser } from '../controllers/users';
import { isAuthenticated } from '../middlewares/authentication';

const api = Router();

api.get('/', isAuthenticated, getUser);

export default api;
