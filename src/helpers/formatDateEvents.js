

export const formatDateEvents = (events) =>{
  return events.map( (event => {
    return {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    };
  }));
};