import { differenceInMinutes, intervalToDuration } from 'date-fns';

interface Duration {
    hours: number;
    minutes: number;
}

export function getDurationBetweenDates(startDate: Date, endDate: Date): Duration {
    const totalMinutes = differenceInMinutes(endDate, startDate);
    const duration = intervalToDuration({ start: startDate, end: endDate });

    return {
        hours: duration.hours || 0,
        minutes: duration.minutes || 0
    };
}
