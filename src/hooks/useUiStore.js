import { useDispatch, useSelector } from "react-redux";
import { onCloseModal, onOpenModal } from "../store";


export const useUiStore = () => {
  const dispatch = useDispatch();

  const {
    isModalOpen
  } = useSelector(state => state.modal);

  const openModal = () => {
    dispatch(onOpenModal());
  };

  const closeModal = () => {
    dispatch(onCloseModal());
  };

  return {
    // Propiedades
    isModalOpen,

    // Metodos
    openModal,
    closeModal
  };
};