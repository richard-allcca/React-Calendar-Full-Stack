import { useMemo, useState } from 'react';

import { addHours, differenceInSeconds } from 'date-fns';

import Modal from 'react-modal';
Modal.setAppElement('#root');
import { customStyles } from './../../helpers/helperCustomStyles';

// change format lenguaje at ReactDatePicker
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
registerLocale('es', es);

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './modal.css';
import { useUiStore } from '../../hooks';

export const CalendarModal = () => {
  const { isModalOpen } = useUiStore();
  const { closeModal } = useUiStore();

  const [ isSubmited, setIsSubmited ] = useState(false);
  const [ form, setForm ] = useState({
    title: 'Richard',
    notes: 'una nota',
    start: new Date(),
    end: addHours(new Date(), 2)
  });

  const titleCase = useMemo(() => {
    if (!isSubmited) return '';

    return form.title.length > 0 ? 'is-valid' : 'is-invalid';
  }, [ form.title, isSubmited ]);

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

  const onSubmit = event => {
    event.preventDefault();
    setIsSubmited(true);
    const diference = differenceInSeconds(form.end, form.start);

    if (isNaN(diference) || diference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');

      return;
    }
    if (form.title.length <= 0) return;

    // console.log(form);
    // TODO - cerrar modal
    // Remover erroes
  };

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
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ form.notes }
            onChange={ onInputChange }></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
