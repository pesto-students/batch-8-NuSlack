import express from 'express';

import {
  getMessages,
  saveMessage,
  updateMessage,
  deleteMessage,
  getOneToOneMessages,
} from '../controllers/messages';

const router = express.Router();

router.get('/', getMessages);

router.post('/', saveMessage);

router.patch('/:id', updateMessage);

router.delete('/:id', deleteMessage);

router.get('/one-to-one', getOneToOneMessages);

export default router;
