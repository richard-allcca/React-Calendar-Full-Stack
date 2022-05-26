import { useDispatch, useSelector } from 'react-redux';
import { closedModal, openingModal } from '../redux/features/modal/modalSlice';

const useModal = () => {
	const modal = useSelector((state) => state.modal);
	const dispatch = useDispatch();

	let isOpen = modal.open;

	const openModal = () => {
		dispatch(openingModal);
	};

	const closeModal = () => {
		dispatch(closedModal);
	};

	// console.log(isOpen);

	return {
		isOpen,
		openModal,
		closeModal
	};
};

export default useModal;
