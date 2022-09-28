import { setYear, parseISO } from 'date-fns'

/**
 * receives "2022-08-10" and returns "2022-08-10"
 */

export function getFutureDate(date: string): Date {
    return setYear(parseISO(date), new Date().getFullYear() + 1)
}