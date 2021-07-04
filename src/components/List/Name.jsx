import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { wsRenameList } from '../../webSocketModule';

const ListName = ({ listId, name }) => {
	const [didMount, setDidMount] = useState(false);
	const [isEditingName, setIsEditingName] = useState(false);
	const [newName, setNewName] = useState(name);

	const dispatch = useDispatch();

	const classes = [
		'list-name',
		...isEditingName ? ['editing'] : '',
	].join(' ');

	const nameInputRef = useRef();

	// Methods
	const saveNameEdit = _ => {
		setIsEditingName(false);
		if (nameInputRef.current.value !== name)
			setNewName(nameInputRef.current.value);
	};
	const cancelNameEdit = _ => {
		nameInputRef.current.value = name; // Reset name input
		setIsEditingName(false);
	};

	// Event handlers
	const handleNameClick = _ => {
		if (isEditingName) return;
		setIsEditingName(true);
		setTimeout(_ => { nameInputRef.current.value = name; });
		setTimeout(_ => nameInputRef.current.select());
	};
	const handleNameInputKeyDown = e => {
		if (e.key === 'Escape') return cancelNameEdit();
		if (e.key === 'Enter') saveNameEdit();
	};

	// On mount
	useEffect(_ => { setDidMount(true); }, []);

	// Rename list
	useEffect(_ => {
		if (didMount) dispatch(wsRenameList({ listId, newName }));
	}, [newName]);

	return (
		<div
			className={classes}
			onClick={handleNameClick}
			onMouseDown={e => e.preventDefault()} // Prevent name edit blur
		>
			<input
				className="edit-name-input"
				onBlur={saveNameEdit}
				onKeyDown={handleNameInputKeyDown}
				ref={nameInputRef}
			/>
			<div className="name-editable" title="Click to rename">
				{name}
				<div className="list-name-edit material-icons">edit</div>
			</div>
		</div>
	);
};

export default ListName;
