import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentView } from '../features/appSlice';
import useClasses from '../hooks/useClasses';
import { animeTarget, getMenuDisplay } from './utils/SideMenu';
import './styles/SideMenu.css';

const SideMenu = () => {
	const [isAnimating, setIsAnimating] = useState(false);
	const { currentView } = useSelector(state => state.app);
	const { code: sheetCode, users } = useSelector(state => state.sheet);
	const { username } = useSelector(state => state.user);
	// end state
	const isOpen = currentView === 'side-menu';
	const classes = useClasses('side-menu', isOpen && 'open');
	// Refs
	const coverRef = useRef();
	const menuRef = useRef();
	const dispatch = useDispatch();

	const animate = ({ complete, coverAnim, menuAnim }) => {
		if (isAnimating) return;
		setIsAnimating(true);
		animeTarget(coverRef, coverAnim);
		animeTarget(menuRef, menuAnim, {
			complete: () => {
				setIsAnimating(false);
				if (typeof complete === 'function') complete();
			},
		});
	};

	const closeMenu = (resetCurrentView = true) =>
		animate({
			...(resetCurrentView && { complete: () => dispatch(setCurrentView()) }),
			coverAnim: 'fadeOut',
			menuAnim: 'slideOut',
		});

	const closeMenuAndDispatch = reducer => {
		closeMenu(false);
		dispatch(reducer);
	};

	const openMenu = () => animate({ coverAnim: 'fadeIn', menuAnim: 'slideIn' });

	const menuDisplay = getMenuDisplay({
		functions: { closeMenuAndDispatch, setCurrentView },
		params: { sheetCode, users, username },
	});

	useEffect(() => {
		if (isOpen) openMenu();
	}, [currentView]);

	return (
		<div className={classes}>
			<div className="side-menu__cover" onClick={closeMenu} ref={coverRef} />
			<div className="side-menu__menu" ref={menuRef}>
				<h1>
					<span className="menu__header-icon material-icons">fastfood</span>
					Grocery List
				</h1>
				{menuDisplay}
			</div>
		</div>
	);
};

export default SideMenu;
