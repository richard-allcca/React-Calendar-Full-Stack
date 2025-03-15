/* eslint-disable no-console */
import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import calendarApi from './../api/calendarApi';
import { formatDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {
  const {
    events,
    activeEvent,
  } = useSelector(state => state.calendar);

  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {

    try {
      if(calendarEvent.id){
        // Actualizar el evento en la DDBB
        const { data } = await calendarApi.put(`/event/${calendarEvent.id}`, calendarEvent);
        // Se envía el evento modificado al state general de eventos
        console.log(data);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
      }else {
        // Crea el nuevo evento
        const { data } = await calendarApi.post('/event', calendarEvent);
        // Pasamos el evento al state general de eventos con el id de data y el user
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }

  };

  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/event/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('event');
      console.log('data', data);
      const result = formatDateEvents(data.eventos);
      dispatch(onLoadEvents(result));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error al cargar eventos');
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return {
    // properties
    events,
    activeEvent,

    // methods
    setActiveEvent,
    startDeleteEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};