import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { eventStyleGetter, getMessagesEs, localizer, myEvent } from '../../helpers';

import { CalendarEventBox, CalendarModal, Navbar } from '../';


export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const onDoubleClick = (event) => {
    console.log({doubleClick: event});
  }

  const onSelect = (event) => {
    console.log({click: event});
  }

  const onViewChange = (event) => {
    // console.log({changeView: event});
    localStorage.setItem('lastView', event)
  }

  return (
    <>
      <Navbar />

      <Calendar
        defaultView={lastView}
        culture='es' // "es" en locales de localizer
        localizer={ localizer }
        events={ myEvent }
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
        startAccessor="start"
        endAccessor="start"
        style={ { height: 'calc(100vh - 80px)' } }//  contenedor calendar
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={
          {
            event: CalendarEventBox // recibe valores de myEvent
          }
        }
      />

      <CalendarModal/>

    </>
  );
};
