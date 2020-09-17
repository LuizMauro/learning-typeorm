import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppErros from '../errors/AppErros';

import authConfig from '../config/auth';

interface ITokenPayload{
  iat: number;
  exp: number;
  sub: string;
}

export default function Authenticated(
  request: Request,
   response: Response,
  next: NextFunction ): void{

    const authHeader = request.headers.authorization;

    if(!authHeader){
      throw new AppErros('Token miss', 401);
    }

    const [, token] =  authHeader.split(' ');

    const { secret } = authConfig.jwt;
    try{

      const decoded = verify( token, secret );

      const { sub } = decoded as ITokenPayload;

      request.user = { useID: sub };

      return next();

    } catch(err){
      throw  new AppErros('Token invalid', 401);
    }


}
