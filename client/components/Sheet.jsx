import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentView } from '../features/appSlice';
import { formatCurrentDate } from '../js/functions';
import { wsCreateList } from '../webSocketModule';
import Checklist from './Checklist';
import List from './List';
import SheetStoreProductsList from './SheetStoreProductsList';

const Sheet = ({ appRoot }) => {
	const { checklistListId, id, lists } = useSelector(state => state.sheet);
	const listIds = Object.keys(lists);
	const listCount = listIds.length;
	const classes = ['sheet-display', ...(id ? '' : ['hidden'])].join(' ');

	const listElements = listIds.map((id, i) => <List id={id} key={i} />);

	const checklistDisplay = checklistListId && (
		<Checklist listId={checklistListId} />
	);

	// List header translation
	const [listHeaderTranslateX, setListHeaderTranslateX] = useState(0);
	const gridRepeatStyle = {
		gridTemplateColumns: `repeat(${listCount}, 110px)`,
	};
	const listOffsetStyle = {
		...gridRepeatStyle,
		transform: `translateX(-${listHeaderTranslateX}px)`,
	};

	const listElementsRef = useRef();
	const dispatch = useDispatch();

	const promptCreateList = () => {
		const name = prompt('New list name:', formatCurrentDate());
		// Abort if user cancelled prompt
		if (name === null) return;

		dispatch(wsCreateList(name));
	};

	const updateListHeaderTranslateX = () =>
		setListHeaderTranslateX(listElementsRef.current.scrollLeft);

	// On mount, bind scroll event listener
	useEffect(() => {
		listElementsRef.current.addEventListener(
			'scroll',
			updateListHeaderTranslateX
		);

		return (cleanup = () =>
			listElementsRef.current.removeEventListener(
				'scroll',
				updateListHeaderTranslateX
			));
	}, []);

	return (
		<div className={classes}>
			<SheetStoreProductsList helperContainer={appRoot.current} />
			<section className="list-elements" ref={listElementsRef}>
				<header className="list-header" style={listOffsetStyle} />
				<main className="list-main" style={gridRepeatStyle}>
					{listElements}
				</main>
				<footer className="list-footer" style={listOffsetStyle} />
			</section>
			{checklistDisplay}
			<button
				className="side changeStore-button circle material-icons"
				onClick={() => dispatch(setCurrentView('store-search'))}
				title="Find a store"
			>
				store
			</button>
			<button
				className="side createList-button circle material-icons"
				onClick={promptCreateList}
				title="Create new list"
			>
				receipt_long
			</button>
		</div>
	);
};

export default Sheet;
