import express from 'express';

import {
  getTeams,
  getTeam,
  saveTeam,
  deleteTeam,
  addUsersToTeam,
  removeUserFromTeam,
} from '../controllers/teams';

const router = express.Router();

router.get('/', getTeams);

router.get('/:id', getTeam);

router.post('/', saveTeam);

router.delete('/:id', deleteTeam);

router.post('/:teamId/add-users', addUsersToTeam);

router.post('/:teamId/remove-user/:userId', removeUserFromTeam);

export default router;
