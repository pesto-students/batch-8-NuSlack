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

router.get('/:username', getUser);

router.post('/', saveUser);

router.patch('/:username', updateUser);

router.delete('/:username', deleteUser);

export default router;
