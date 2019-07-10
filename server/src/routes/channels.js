import express from 'express';

import {
  getChannels,
  getChannel,
  saveChannel,
  updateChannel,
  deleteChannel,
} from '../controllers/channels';

const router = express.Router();

router.get('/', getChannels);

router.get('/:id', getChannel);

router.post('/', saveChannel);

router.patch('/:id', updateChannel);

router.delete('/:id', deleteChannel);

export default router;
