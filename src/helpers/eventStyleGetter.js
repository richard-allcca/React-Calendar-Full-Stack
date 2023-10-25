
// STUB - Util para aplica estilos al evento en calendario

export const eventStyleGetter = (event, start, end, isSelected) => {
  // console.log(event, start, end, isSelected) // 

	const style = {
		// backgroundColor: event.bgcolor,
		backgroundColor: 'hsl(211, 100%, 40%)',
		borderRadius: '4px',
		color: 'white',
		display: 'block',
		opacity: 0.8,
	};

	return {
		style
	};
};