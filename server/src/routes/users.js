import express from 'express';
import {
  getUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
} from '../controllers/users';

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', saveUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
