import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// alert
import Swal from 'sweetalert2';
import { addEvent } from '../redux/features/events/eventSlice';
import { closeModal } from '../redux/features/modal/modalSlice';

// hora y fecha modificada sin minutos ni segundos
let now = moment().minutes(0).seconds(0).add(1, 'hours');
let nowEnd = now.clone().add(1, 'hours');


export const useCalendar = () => {
  // states
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowEnd.toDate());
  const [titleValid, setTitleValid] = useState(true);
  // const [isOpen, setIsOpen] = useState(true);
  const [form, setForm] = useState({
    title: 'Evento',
    notes: '',
    start: now.toDate(),
    end: nowEnd.toDate()
  });

  // redux
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const { title, notes, start, end } = form;

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleStartDate = (date) => {
    // console.log(moment(date).toDate())
    // const dateParse = moment(date).toDate()
    // setDateStart(dateParse);
    setDateStart(date);
    setForm({
      ...form,
      start: date
    });
  };

  const handleEndDate = (date) => {
    // const dateParse = moment(date).toDate()
    // setDateEnd(dateParse);
    setDateEnd(date);
    setForm({
      ...form,
      end: date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('⚠️ Error', 'La fecha de inicio debe ser menor a la fecha de fin', 'error');
    }
    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    // TODO: enviar a firebase
    dispatch(addEvent(form));

    // return
    dispatch(closeModal(modal));
    setTitleValid(true);
  };

  return {
    form,
    dateStart,
    dateEnd,
    titleValid,
    handleInput,
    notes,
    handleStartDate,
    handleEndDate,
    handleSubmit
  };
};
