
// STUB - Util para aplica estilos al evento en calendario

export const eventStyleGetter = (event, user) => {
	const isMyEvent = user.uid === event.user._id || user.uid === event.user.uid ;

	const style = {
		backgroundColor:  isMyEvent ? '#0064d3' : '#e53238',
		borderRadius: '4px',
		color: 'white',
		display: 'block',
		opacity: 0.8,
	};

	return {
		style
	};
};