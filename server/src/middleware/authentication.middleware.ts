import jwt from 'jsonwebtoken';
import env from 'dotenv';
// import { HttpResponseBuilder } from './error';
env.config();
export  function verify(req, res, next) {
    try {
      const jwtSecret = process.env.JWT_SECRET;
  
      if (!jwtSecret) {
        throw new Error(
          'JWT secret is not defined. Please set the JWT_SECRET environment variable.'
        );
      }
  
      const accessToken = req.headers.authorization;
      if (accessToken) {
        const token = accessToken.split(' ')[1];
        jwt.verify(token, jwtSecret, (err, decoded) => {
          if (err) {
            throw Error('Invalid token');
          } else {
            req.userToken = decoded;
            next();
          }
        });
      } else {
        throw Error('No token provided');
      }
    } catch (err:any) {
      err.status = 403;
      next(err);
    }
  }
