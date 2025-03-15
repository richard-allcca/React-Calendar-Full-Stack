import PropTypes from 'prop-types';

export const CalendarEventBox = ({ event }) => {
  // console.log(event);
  const { title, user } = event;

return (
    <>
      <strong>{title}</strong>
      <br />
      <span>{user.name}</span>
    </>
  );
};

CalendarEventBox.propTypes = {
  event: PropTypes.object,
};
