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

router.post('/:channelId/add-user/:userId', addUserToChannel);

router.post('/:channelId/remove-user/:userId', removeUserFromChannel);

export default router;
