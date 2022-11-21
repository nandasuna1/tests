import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppoitmentRepository } from "../repositories/in-memory/in-memory-appoitments-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe('Create Appointment', () => {
    it('it should be abble to create an appointment', () => {
        const startsAt = getFutureDate('2022-08-10');
        const endsAt = getFutureDate('2022-08-15');

        const appointmentsRepository = new InMemoryAppoitmentRepository()
        const createAppointment = new CreateAppointment(appointmentsRepository)

        expect(createAppointment.execute({
            customer: 'Jonh Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    });
})

it('should not be abble to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2022-08-10');
    const endsAt = getFutureDate('2022-08-15');

    const appointmentsRepository = new InMemoryAppoitmentRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository)

    await createAppointment.execute({
        customer: 'Jonh Doe',
        startsAt,
        endsAt
    })

    expect(createAppointment.execute({
        customer: 'Jonh Doe',
        startsAt: getFutureDate('2022-08-14'),
        endsAt: getFutureDate('2022-08-18')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
        customer: 'Jonh Doe',
        startsAt: getFutureDate('2022-08-08'),
        endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
        customer: 'Jonh Doe',
        startsAt: getFutureDate('2022-08-11'),
        endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error)

});
