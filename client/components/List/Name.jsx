import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useClasses from '../../hooks/useClasses';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { wsRenameList } from '../../webSocketModule';

const ListName = ({ listId, name }) => {
	const [isEditingName, setIsEditingName] = useState(false);
	const [newName, setNewName] = useState(name);

	const classes = useClasses('list-name', isEditingName && 'editing');
	const nameInputRef = useRef();
	const dispatch = useDispatch();

	// Methods
	const saveNameEdit = () => {
		setIsEditingName(false);
		if (nameInputRef.current.value !== name)
			setNewName(nameInputRef.current.value);
	};
	const cancelNameEdit = () => {
		nameInputRef.current.value = name; // Reset name input
		setIsEditingName(false);
	};

	// Event handlers
	const handleNameClick = () => {
		if (isEditingName) return;
		setIsEditingName(true);
		setTimeout(() => {
			nameInputRef.current.value = name;
		});
		setTimeout(() => nameInputRef.current.select());
	};
	const handleNameInputKeyDown = e => {
		if (e.key === 'Escape') return cancelNameEdit();
		if (e.key === 'Enter') saveNameEdit();
	};

	useUpdateEffect([
		() => dispatch(wsRenameList({ listId, newName })),
		[newName],
	]);

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
