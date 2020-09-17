import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs'

import User from '../models/User';


interface IRequest{
  useName: string;
  useEmail: string;
  usePasswordHash: string;
}


class CreateUserService {
  public async execute({ useName, useEmail, usePasswordHash }: IRequest): Promise<User>{
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: {useEmail: useEmail}
    });

    if(checkUserExists){
      throw new Error("Email já utilizado!");
    }

    const hashedPassword = await hash(usePasswordHash, 8);

    const user = usersRepository.create({
      useName,
      useEmail,
      usePasswordHash: hashedPassword
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
