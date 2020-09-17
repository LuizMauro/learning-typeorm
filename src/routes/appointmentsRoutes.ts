import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import authenticated from '../middlewares/Authenticated';

const appointmentRouter = Router();

appointmentRouter.use(authenticated);

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRpository = getCustomRepository(AppointmentsRepository);

  console.log("useID", request.user.useID);

  const appointments = await appointmentsRpository.find();

  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id: provider_id
    });

    return response.json(appointment);

});

export default appointmentRouter;
