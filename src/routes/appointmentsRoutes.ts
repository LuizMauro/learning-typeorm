import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();


appointmentRouter.get('/', async (request, response) => {
  const appointmentsRpository = getCustomRepository(AppointmentsRepository);

  try {
    const appointments = await appointmentsRpository.find();

    return response.json(appointments);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }

});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id: provider_id
    });

    return response.json(appointment);


  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentRouter;
