import anime from 'animejs/lib/anime.min.js';

const [easing, duration] = ['linear', 80];
const animeTarget = (target, properties) =>
	anime({
		...properties,
		duration,
		easing,
		targets: target.current,
	});

export const fadeInModal = (baseElementRef, containerElementRef) => {
	animeTarget(baseElementRef, { opacity: [0, 1] });
	animeTarget(containerElementRef, { marginTop: [5, 0] });
};

export const fadeOutModal = baseElementRef =>
	animeTarget(baseElementRef, { opacity: 0 });
