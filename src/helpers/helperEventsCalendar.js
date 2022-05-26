import moment from 'moment';

// Contenido del evento
export const myEvent = [
	{
		title: 'Event 1',
		start: moment().toDate(), // similar a new Date(2019, 3, 1),
		end: moment().add(1, 'hours').toDate(), //fin del evento
		bgcolor: 'rgba(255,255,255,0.5)', // propiedad opcional
		user: {
			_id: '123',
			name: 'Richard'
		}
	}
];

// para aplicar estilos al evento en calendario
export const eventStyleGetter = (event, start, end, isSelected) => {
	// name event, start date, end date, background color

	const style = {
		// backgroundColor: event.bgcolor,
		backgroundColor: '#367cf7',
		borderRadius: '0px',
		opacity: 0.8,
		display: 'block',
		color: 'white'
	};

	return {
		style
	};
};
