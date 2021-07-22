import anime from 'animejs/lib/anime.min.js';

const anim = {
	fadeIn: { opacity: [0, 1] },
	fadeOut: { opacity: [1, 0] },
	slideIn: { translateX: ['-100%', 0] },
	slideOut: { translateX: [0, '-100%'] },
};
const [duration, easing] = [350, 'easeOutExpo'];
export const animeTarget = (target, animName, properties) => anime({
	targets: target.current,
	duration,
	easing,
	...anim[animName],
	...properties,
});
