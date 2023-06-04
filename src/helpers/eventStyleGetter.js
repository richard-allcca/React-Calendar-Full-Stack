
// NOTE - Aplica estilos al evento en calendario

export const eventStyleGetter = (event, start, end, isSelected) => {
  // console.log(event, start, end, isSelected)

	// name event, start date, end date, background color

	const style = {
		// backgroundColor: event.bgcolor,
		backgroundColor: 'hsl(211, 100%, 40%)',
		borderRadius: '4px',
		opacity: 0.8,
		display: 'block',
		color: 'white'
	};

	return {
		style
	};
};