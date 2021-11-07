import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import anime from 'animejs/lib/anime.min.js';
import useUpdateEffect from './useUpdateEffect';

export default useUpdateQuantity = ({
	reduxSelector,
	defaultQuantity,
	saveDelay,
	onUpdate,
}) => {
	const reduxQuantity = useSelector(reduxSelector);
	// Quantity to display, including any changes
	const [tempQuantity, setTempQuantity] = useState(defaultQuantity);
	// Saved quantity to compare to for update
	const [saveQuantity, setSaveQuantity] = useState(defaultQuantity);

	const quantityTimer = useRef();
	const flashElementRef = useRef();

	const increaseQuantity = () => setTempQuantity(tempQuantity + 1);
	const decreaseQuantity = () => setTempQuantity(Math.max(1, tempQuantity - 1));
	const updateQuantity = () => {
		clearTimeout(quantityTimer.current);
		if (saveQuantity !== tempQuantity) setSaveQuantity(tempQuantity);
	};

	const resetSaveDelay = () => {
		clearTimeout(quantityTimer.current);
		quantityTimer.current = setTimeout(updateQuantity, saveDelay);
	};

	const flashQuantityUpdate = () => {
		setTempQuantity(reduxQuantity);
		// Prevent tempQuantity useEffect timer from updating new quantity again
		setTimeout(() => clearTimeout(quantityTimer.current), 0);

		// Flash update animation
		anime({
			targets: flashElementRef.current,
			background: ['#262', '#222'],
			duration: 800,
			easing: 'linear',
		});
	};

	useUpdateEffect(
		[resetSaveDelay, [tempQuantity]],
		[() => onUpdate(saveQuantity), [saveQuantity]],
		[flashQuantityUpdate, [reduxQuantity]]
	);

	return {
		tempQuantity,
		increaseQuantity,
		decreaseQuantity,
		updateQuantity,
		flashElementRef,
	};
};
