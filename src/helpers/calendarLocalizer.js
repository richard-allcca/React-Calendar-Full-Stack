import { dateFnsLocalizer } from 'react-big-calendar';

import { format, parse, startOfWeek, getDay } from 'date-fns';

import enES from 'date-fns/locale/es'

// STUB - Util con configuraciones necesarias para calendar, pero además cambia el idioma

const locales = {
  'es': enES,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales, // textos de la semana en español
})
