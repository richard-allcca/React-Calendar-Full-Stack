import React, { useMemo, useState } from 'react';

import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es';

import Modal from 'react-modal';
Modal.setAppElement('#root');
import { customStyles } from './../../helpers/helperCustomStyles';

import ReactDatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
registerLocale('es', es);

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import 'sweetalert2/src/sweetalert2.scss'


import './modal.css';

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSubmited, setIsSubmited] = useState(false);
  const [form, setForm] = useState({
    title: 'Richard',
    notes: 'una nota',
    start: new Date(),
    end: addHours(new Date(), 2)
  });

  const titleCase = useMemo(() => {
    if (!isSubmited) return '';
    return (form.title.length > 0)
      // ? '' // el profe lo dejo así
      ? 'is-valid'
      : 'is-invalid';
  }, [form.title, isSubmited]);

  const onInputChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value
    });
  };

  // changing = start | end
  // event = full date
  const onDateChanged = (event, changing) => {
    setForm({
      ...form,
      [changing]: event
    });
  };

  const onCloseModal = () => {
    console.log('cerrando modal');
    setIsOpen(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSubmited(true);
    const diference = differenceInSeconds(form.end, form.start);// fecha mayor - fecha menor

    if (isNaN(diference) || diference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return;
    }
    if (form.title.length <= 0) return;

    console.log(form);
    // TODO - cerrar modal
    // Remover erroes
  };

  return (
    <Modal
      isOpen={ isOpen }
      // onAfterOpen={afterOpenModal}
      onRequestClose={ onCloseModal }
      style={ customStyles }
      closeTimeoutMS={ 200 }
      // contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >

      <h1> Nuevo evento </h1>
      <hr />

      <form onSubmit={ onSubmit } className="container">
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <ReactDatePicker
            selected={ form.start }
            className='form-control'
            onChange={ (event) => onDateChanged(event, 'start') }
            dateFormat="Pp"
            showTimeSelect
            locale={ es }
            timeCaption='Hora'
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <ReactDatePicker
            minDate={ form.start }
            selected={ form.end }
            className='form-control'
            onChange={ (event) => onDateChanged(event, 'end') }
            dateFormat="Pp"
            showTimeSelect
            locale={ es }
            timeCaption='Hora'
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={ `form-control ${titleCase}` }
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ form.title }
            onChange={ onInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ form.notes }
            onChange={ onInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>

    </Modal>
  );
};
