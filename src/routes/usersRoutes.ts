import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
    return response.send();
});

usersRouter.post('/', async (request, response) => {

    const { useName, useEmail, usePassword } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      useName,
      useEmail,
      usePasswordHash: usePassword
    })


    return response.json(user);
});


export default usersRouter;
