import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe('Create Appointment', () => {
    it('it should be abble to create an appointment', () => {
        const createAppointment= new CreateAppointment();
        const startsAt = getFutureDate('2022-08-10');
        const endsAt = getFutureDate('2022-08-11');

        expect(createAppointment.execute({
            customer: 'Jonh Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    });
})
