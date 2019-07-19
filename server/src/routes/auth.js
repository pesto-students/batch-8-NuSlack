import express from 'express';
import passport from 'passport';
import { googleAuthHandler, basicAuthHandler, basicSignupHandler } from '../controllers/auth';

const router = express.Router();

router.post(
  '/google',
  passport.authenticate('google-token', { session: false }),
  googleAuthHandler,
);

router.post('/signup', basicSignupHandler);

router.post('/login', basicAuthHandler);

export default router;
