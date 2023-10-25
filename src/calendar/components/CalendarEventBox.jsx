import React from "react";

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

