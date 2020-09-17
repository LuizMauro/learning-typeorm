import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  try {
    return response.send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }

});

usersRouter.post('/', async (request, response) => {
  try {
    const { useName, useEmail, usePassword } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      useName,
      useEmail,
      usePasswordHash: usePassword
    })


    return response.json(user);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});


export default usersRouter;
