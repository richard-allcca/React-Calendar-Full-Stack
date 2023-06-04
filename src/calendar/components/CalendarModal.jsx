import React, { useState } from 'react';

import { addHours } from 'date-fns';

import Modal from 'react-modal';

import ReactDatePicker from 'react-datepicker';

import { customStyles } from './../../helpers/helperCustomStyles';

Modal.setAppElement('#root');

import "react-datepicker/dist/react-datepicker.css";
import './modal.css';

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [form, setForm] = useState({
    title: 'Richard',
    notes: 'una nota',
    start: new Date(),
    end: addHours(new Date(), 2)
  });

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
      <form className="container">

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <ReactDatePicker
            selected={ form.start }
            className='form-control'
            onChange={ (event) => onDateChanged(event, 'start') }
            dateFormat="Pp"
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
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
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
