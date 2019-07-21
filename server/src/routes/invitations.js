import express from 'express';

import {
  getInvitations,
  inviteUsers,
  acceptInvitation,
  rejectInvitation,
} from '../controllers/invitations';

const router = express.Router();

router.get('/', getInvitations);

router.post('/', inviteUsers);

router.post('/:id/accept', acceptInvitation);

router.post('/:id/reject', rejectInvitation);

export default router;
