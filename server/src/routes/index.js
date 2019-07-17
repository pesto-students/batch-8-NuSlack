import { Router } from 'express';
import users from './users';
import channels from './channels';
import messages from './messages';
import teams from './teams';

const api = Router();

// '/api/'
api.get('/', (req, res) => {
  res.json({ hi: 'there' });
});

// '/api/_health'
api.get('/_health', (req, res) => {
  res.sendStatus(200);
});

// set routes below
api.use('/users', users);

api.use('/channels', channels);

api.use('/messages', messages);

api.use('/teams', teams);

export default api;
