import express from 'express';
import {
  getUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
  addUserToChannels,
  removeUserFromChannel,
} from '../controllers/users';

const router = express.Router();

router.get('/', getUsers);

router.get('/:username', getUser);

router.post('/', saveUser);

router.patch('/:username', updateUser);

router.delete('/:username', deleteUser);

router.post('/:username/add-to-channels', addUserToChannels);

router.delete('/:username/remove-from-channel/:channelId', removeUserFromChannel);

export default router;
