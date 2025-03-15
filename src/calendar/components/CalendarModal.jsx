import { useEffect, useMemo, useState } from 'react';

import { addHours, differenceInSeconds } from 'date-fns';

import Modal from 'react-modal';
import { customStyles } from './../../helpers/helperCustomStyles';
Modal.setAppElement('#root');

// change format lenguaje at ReactDatePicker
import es from 'date-fns/locale/es';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('es', es);

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { useCalendarStore, useUiStore } from '../../hooks';
import './modal.css';

const initialForm = {
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2)
};

export const CalendarModal = () => {
  const { isModalOpen, closeModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const [ form, setForm ] = useState(initialForm);

  const titleCase = useMemo(() => {
    if (!isSubmitted) return '';

    return form.title.length > 0 ? 'is-valid' : 'is-invalid';
  }, [ form.title, isSubmitted ]);

  const onInputChange = ({ target }) => {
    setForm({
      ...form,
      [ target.name ]: target.value
    });
  };

  const onDateChanged = (event, changing) => {
    setForm({
      ...form,
      [ changing ]: event // start|end - full date
    });
  };

  const onSubmit = async event => {
    event.preventDefault();
    setIsSubmitted(true);

    const deference = differenceInSeconds(form.end, form.start);
    if (isNaN(deference) || deference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');

      return;
    }

    if (form.title.length <= 0) return;
    if (form.notes.length <= 0) {
      Swal.fire('Sin descripción', 'Estas seguro de continuar sin descripción?', 'error');

      return;
    }
    await startSavingEvent(form);
    closeModal();
    setIsSubmitted(false);
  };

  useEffect(() => {
    if (activeEvent === null) return;
    setForm({ ...activeEvent });
  }, [ activeEvent ]);


  return (
    <Modal
      // contentLabel="Example Modal"
      // onAfterOpen={afterOpenModal}
      className="modal"
      closeTimeoutMS={ 200 }
      isOpen={ isModalOpen }
      onRequestClose={ () => closeModal() }
      overlayClassName="modal-fondo" // background style
      style={ customStyles }>
      <h1> Nuevo evento </h1>
      <hr />

      <form onSubmit={ onSubmit } className="container">
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <ReactDatePicker
            className="form-control" // bootstrap
            dateFormat="Pp" // show hours, minutos at input
            locale={ es } // forma lenguage
            onChange={ event => onDateChanged(event, 'start') }
            selected={ form.start }
            showTimeSelect // show time selection
            timeCaption="Hora" // change title select hour
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <ReactDatePicker
            className="form-control"
            dateFormat="Pp"
            locale={ es }
            minDate={ form.start }
            onChange={ event => onDateChanged(event, 'end') }
            selected={ form.end }
            showTimeSelect
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo de notas</label>
          <input
            type="text"
            className={ `form-control ${titleCase}` }
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ form.title }
            onChange={ onInputChange }
          />
        </div>

        <div className="form-group mb-2">
          <small id="emailHelp" className="form-text text-muted mb-2" >
            Una descripción corta
          </small>
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ form.notes }
            onChange={ onInputChange }></textarea>
        </div>

        <small id="emailHelp" className="form-text text-muted mb-2">
          Información adicional
        </small>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
