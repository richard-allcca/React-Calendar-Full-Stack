import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNewEvent = () => {
  const { openModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClick = () => {
    openModal();
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      user: {
        _id: '123',
        name: 'Richard'
      }
    });
  };

  return (
    <button
      className="btn btn-primary fab"
      onClick={ handleClick }
    >
      <i className="fas fa-plus" ></i>
    </button>
  );
};
