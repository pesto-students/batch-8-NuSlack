import passport from 'passport';
import { createToken } from '../utils/token.utils';
import * as constants from '../constants/failedResponse';

const googleAuthHandler = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: constants.notAuthenticated,
    });
  }

  req.user.authToken = createToken(req.user);
  return res.json({
    user: req.user,
  });
};

const basicAuthHandler = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const message = (err && err.message) || (info && info.message) || 'Unknown Error';
        return res.status(401).json({
          message,
        });
      }
      return req.login(user, { session: false }, async (error) => {
        if (error) {
          return res.status(401).json({
            message: error.message,
          });
        }

        const newUser = {
          ...user,
        };
        newUser.authToken = createToken(user);
        return res.json({
          user: newUser,
        });
      });
    } catch (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  })(req, res, next);
};

const basicSignupHandler = async (req, res, next) => {
  passport.authenticate('signup', { session: false }, async (err, user, info) => {
    try {
      if (err || !user) {
        const message = (err && err.message) || (info && info.message) || 'Unknown Error';
        return res.status(400).json({
          message,
        });
      }
      return res.json({
        user,
        message: 'Signup successful',
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  })(req, res, next);
};

export { googleAuthHandler, basicAuthHandler, basicSignupHandler };
