import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointments';

interface IRequest{
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if(findAppointmentInSameDate){
      throw Error("this appointment is already booked");
    }

    const appointment = appointmentsRepository.create({
      provider_id: provider_id,
      date: appointmentDate
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
