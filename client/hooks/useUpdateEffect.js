import { useEffect, useState } from 'react';

export default useUpdateEffect = (...callbackDependenciesArray) => {
	const [didMount, setDidMount] = useState(false);
	useEffect(() => setDidMount(true), []);

	callbackDependenciesArray.map(([callback, dependencies]) =>
		useEffect(() => {
			if (didMount) callback();
		}, dependencies)
	);
};
