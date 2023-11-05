import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {
  const {
    events,
    activeEvent,
  } = useSelector(state => state.calendar);

  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = (calendarEvent) => {
    // TODO - llegar al backend

    if(calendarEvent._id){
      // Actualizar
      dispatch(onUpdateEvent);
    }else {
      // Crear
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeleteEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    // properties
    events,
    activeEvent,

    // methods
    deleteEvent: startDeleteEvent,
    setActiveEvent,
    startSavingEvent,
  };
};