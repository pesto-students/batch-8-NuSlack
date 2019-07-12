import express from 'express';

import {
  getChannels,
  getChannel,
  saveChannel,
  updateChannel,
  deleteChannel,
  addUserToChannel,
  removeUserFromChannel,
} from '../controllers/channels';

const router = express.Router();

router.get('/', getChannels);

router.get('/:id', getChannel);

router.post('/', saveChannel);

router.patch('/:id', updateChannel);

router.delete('/:id', deleteChannel);

router.post('/:id/add-user/:username', addUserToChannel);

router.post('/:id/remove-user/:username', removeUserFromChannel);

export default router;
