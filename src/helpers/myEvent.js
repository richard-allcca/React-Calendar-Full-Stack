import { addHours } from 'date-fns';

// STUB - content of event box in calendar

export const myEvent = [
  {
    // bgcolor: '#cc4100', // FIXME - NO FUNCIONA
    bgColor: 'hsl(211, 100%, 40%)', // FIXME - NO FUNCIONA
    title: 'Event 1',
    notes: 'comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),// fecha y cantidad de horas
    user: {
      _id: '123',
      name: 'Richard'
    }
  },
];