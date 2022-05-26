import React from 'react';
import Datetime from 'react-datetime';
// styles datetime
import 'react-datetime/css/react-datetime.css';
// modal
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { customStyles } from '../../helpers/helperCustomStyles';
// customHook
import { useCalendar } from '../../hooks/useCalendar';
import { closeModal } from '../../redux/features/modal/modalSlice';
// styles
import './modal.css';
Modal.setAppElement('#root');


const CalendarModal = () => {
  // useCalendar
  const {
    form,
    dateStart,
    dateEnd,
    titleValid,
    handleInput,
    handleStartDate,
    handleEndDate,
    handleSubmit,
  } = useCalendar();

  const { title, notes } = form;

  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  let isOpen = modal.open;

  const cerrar = () => {
    dispatch(closeModal(modal));
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={cerrar}
        style={customStyles}
        closeTimeoutMS={200}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-fondo"
      >
        {/* content modal */}
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <Datetime onChange={handleStartDate} value={dateStart} />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <Datetime onChange={handleEndDate} value={dateEnd} />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y Descripción</label>
            <input
              type="text"
              className={`form-control ${!titleValid && 'is-invalid'}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={title}
              onChange={handleInput}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              style={{ resize: 'none' }}
              value={notes}
              onChange={handleInput}
            />
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save" />
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CalendarModal;
