import express from 'express';

import {
  getMessages,
  saveMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/messages';

const router = express.Router();

router.get('/', getMessages);

router.post('/', saveMessage);

router.patch('/:id', updateMessage);

router.delete('/:id', deleteMessage);

export default router;
