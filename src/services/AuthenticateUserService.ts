import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth';

import User from '../models/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService{
  public async execute({ email, password }: IRequest): Promise<IResponse>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { useEmail: email}
    });


    if(!user){
      throw new Error('Email não existe');
    }

    const passwordMathced = await compare(password, user.usePasswordHash);

    if(!passwordMathced){
      throw new Error('Email ou senha incorretos');
    }

    //Usuario tudo ok

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.useID,
      expiresIn: expiresIn,
    });

    return {user, token}

  }
}


export default AuthenticateUserService;
