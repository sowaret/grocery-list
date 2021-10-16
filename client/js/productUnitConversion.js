const _mod = {
	conversions: {
		liquid: {
			'fl oz': 1,
			pt: 16,
			qt: 32,
			l: 33.814,
			gal: 128,
		},
		weight: {
			oz: 1,
			lb: 16,
		},
	},

	countUnits: str => {
		// str '12 fl oz';
		let split = str.split(' '); // 12, fl, oz
		return [split.shift(), ...[split.join(' ')]]; // 12, fl oz
	},

	calculatePerSize: (size, price, activePrice) => {
		if (!size || !price) return;

		let count,
			unit,
			originalUnit,
			containerCount,
			_,
			multi = size.split('/').map(x => x.trim());

		// Handle bottles
		if (multi.length > 1) {
			[containerCount, _] = _mod.countUnits(multi[0]);
			[count, originalUnit] = _mod.countUnits(multi[1]);

			count = count * containerCount;
		} else [count, originalUnit] = _mod.countUnits(size);

		if (Object.keys(_mod.conversions.liquid).includes(originalUnit)) {
			count = count * _mod.conversions.liquid[originalUnit];
			unit = 'fl oz';
		} else if (Object.keys(_mod.conversions.weight).includes(originalUnit)) {
			count = count * _mod.conversions.weight[originalUnit];
			unit = 'oz';
		} else unit = originalUnit;

		// Convert units
		const perSizeCost = Math.round((activePrice / count) * 1000) / 1000;
		return `${perSizeCost}/${unit}`;
	},
};

module.exports = _mod;
