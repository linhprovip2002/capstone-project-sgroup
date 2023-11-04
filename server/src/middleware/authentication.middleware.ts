import jwt from 'jsonwebtoken';
import env from 'dotenv';
import { HttpResponseBuilder } from './error';
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
     
      const token = accessToken.split(' ')[1];
      if ( !accessToken || !token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
          if (err) {
            next(HttpResponseBuilder.buildUnAuthorized(res, err.message));
          } else {
            req.userToken = decoded;
            next();
          }
        });
      } else {
        next(HttpResponseBuilder.buildUnAuthorized(res, 'No token provided'));
      }
    } catch (err:any) {
      err.status = 401;
      next(err);
    }
  }
  