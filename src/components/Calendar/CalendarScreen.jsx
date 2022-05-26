import moment from 'moment';
import 'moment/locale/es'; // cambio de idioma para dias de calendario
import React, { useState } from 'react';
// calendar
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import messages from 'react-big-calendar/lib/utils/messages';
// redux
import { useDispatch } from 'react-redux';
// helpers
import { eventStyleGetter, myEvent } from '../../helpers/helperEventsCalendar';
import { activeEvent } from '../../redux/features/events/eventSlice';
import { openModal } from '../../redux/features/modal/modalSlice';
import AddNewFab from '../Button/AddNewFab';
import CalendarModal from '../modal/CalendarModal';
// components
import Navbar from '../Navbar/Navbar';
import CalendarEvent from './CalendarEvent';


moment.locale('es'); // cambio de idioma para dias en cuadricula de calendario

const localizer = momentLocalizer(moment); // usa moment para localizar fecha en calendario

// component
const CalendarScreen = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  // reducers
  const dispatch = useDispatch();

  const onViewChange = (event) => {
    setLastView(event);
    localStorage.setItem('lastView', event);
  };

  const onDoubleClickEvent = (event) => {
    dispatch(openModal());
  };

  const onSelectEvent = (event) => {
    // console.log(event);
    dispatch(activeEvent(event))
    // console.log(eventClick);
  };

  return (
    <div className="calendar-screen">
      <Navbar />;
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        messages={messages} // cambio de idioma para mensages de calendario
        events={myEvent}
        eventPropGetter={eventStyleGetter} // cambio de estilo para eventos
        onDoubleClickEvent={onDoubleClickEvent} // handle event double click
        onSelectEvent={onSelectEvent} // handle event select
        onView={onViewChange} // handle view change
        view={lastView} // ultima vista del calendario
        components={{
          event: CalendarEvent // personaliza componente para eventos
        }}
      />

      <AddNewFab />

      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
