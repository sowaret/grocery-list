import React, { useRef, useState } from 'react';
import API from '../../js/apiAccess';
import { formatString } from '../../js/functions';
import Modal from './Modal';

const SearchModal = ({
	iconName,
	title,
	className = '',
	inputPlaceholder = 'Search...',
	inputState,
	apiUrl,
	searchArgs,
	resultComponent,
	onResultSelect,
	isVisible,
	children,
}) => {
	// - inputState must be array of [value, setterFunction]
	const [results, setResults] = useState([]);
	const [value, setValue] = inputState;
	const classes = [
		'SearchModal',
		...className ? [className] : '',
	].join(' ');
	const resultsDisplay = results.length
		? results.map((result, i) =>
			React.createElement(resultComponent, {
				key: i,
				data: result,
				onClick: onResultSelect,
			}))
		: null;
	const inputRef = useRef();

	const clearInputAndFocus = _ => {
		inputRef.current.value = '';
		setTimeout(_ => inputRef.current.focus());
	};
	const searchOnEnterKey = e => {
		if (e.key === 'Enter') executeSearch();
	};
	const executeSearch = _ => {
		API.get(formatString(apiUrl, ...searchArgs), {
			success: data => setResults(data),
			fail: err => alert(`Search failed:\n${err.messages.join('\n')}`),
		});
	};

	return (
		<Modal
			iconName={iconName}
			title={title}
			className={classes}
			onOpen={clearInputAndFocus}
			isVisible={isVisible}
		>
			<input
				className="searchModal-input"
				placeholder={inputPlaceholder}
				onChange={e => setValue(e.target.value)}
				onKeyDown={searchOnEnterKey}
				value={value}
				ref={inputRef}
			/>
			<div className="searchModal-results">{resultsDisplay}</div>
		</Modal>
	);
};

export default SearchModal;
