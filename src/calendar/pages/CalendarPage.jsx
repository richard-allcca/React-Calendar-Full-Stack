import { useState } from "react";
import { Calendar } from "react-big-calendar";

import {
  eventStyleGetter, getMessagesEs, localizer,
} from "../../helpers";

import { CalendarEventBox, CalendarModal, FabAddNewEvent, Navbar } from "../";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";
import { FabDelete } from "../components/FabDelete";
import { useEffect } from "react";

export const CalendarPage = () => {
  const { openModal } = useUiStore();
  const { user } = useAuthStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [ lastView ] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const onDoubleClick = () => {
    // console.log(event);
    openModal();
  };

  const onSelect = (event) => {
    // console.log({ click: event });
    setActiveEvent(event);
  };

  // Controla la vista (mes, semana, dia, agenda)
  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
  };

  useEffect(() => {
    startLoadingEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        culture="es" // Dias semanas y meses en español
        defaultView={ lastView } // (mes, semana, dia, agenda)
        endAccessor="start"
        eventPropGetter={ (event) => eventStyleGetter(event,user) } // Styles to elements calendar
        events={ events }
        localizer={ localizer }
        messages={ getMessagesEs() } // More calendar texts in Spanish
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChange }
        startAccessor="start"
        style={ { height: "calc(100vh - 80px)" } } //  contenedor calendar
        components={ { event: CalendarEventBox } }
      />

      <CalendarModal />
      <FabAddNewEvent/>
      <FabDelete/>
    </>
  );
};
