import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appoitment-repositorie";

interface CreateAppointmentRequest {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
    constructor(
        private appointmentsRepositories: AppointmentRepository
    ){}

    async execute({ customer, startsAt, endsAt}: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
        const overlappingAppointment = await this.appointmentsRepositories.findOverLappingAppointment(startsAt, endsAt)

        if(overlappingAppointment) {
            throw new Error('Another appointment overlaps in this date')
        }

        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt
        })


        await this.appointmentsRepositories.create(appointment)

        return appointment;
    }
}