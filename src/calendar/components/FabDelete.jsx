import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { activeEvent, startDeleteEvent } = useCalendarStore();

  const handleDelete = () => {
    startDeleteEvent();
  };

  if(activeEvent === null ) return null;

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={ handleDelete }
    >
      <i className="fas fa-trash-alt" ></i>
    </button>
  );
};
