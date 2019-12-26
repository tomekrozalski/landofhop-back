function galleryPathsToRemove({
	badge,
	brand,
	files,
	shortId,
}) {
	const paths = [];

	Array(files).fill('').forEach((value, i) => {
		const properIndex = i + 1;
		const fileName = properIndex < 10 ? `0${properIndex}` : properIndex;

		paths.push(
			{ Key: `${brand}/${badge}/${shortId}/container/jpg/4x/${fileName}.jpg` },
			{ Key: `${brand}/${badge}/${shortId}/container/jpg/2x/${fileName}.jpg` },
			{ Key: `${brand}/${badge}/${shortId}/container/jpg/1x/${fileName}.jpg` },
			{ Key: `${brand}/${badge}/${shortId}/container/webp/4x/${fileName}.webp` },
			{ Key: `${brand}/${badge}/${shortId}/container/webp/2x/${fileName}.webp` },
			{ Key: `${brand}/${badge}/${shortId}/container/webp/1x/${fileName}.webp` },
		);

		if (properIndex === files) {
			paths.push(
				{ Key: `${brand}/${badge}/${shortId}/container/jpg/4x` },
				{ Key: `${brand}/${badge}/${shortId}/container/jpg/2x` },
				{ Key: `${brand}/${badge}/${shortId}/container/jpg/1x` },
				{ Key: `${brand}/${badge}/${shortId}/container/webp/4x` },
				{ Key: `${brand}/${badge}/${shortId}/container/webp/2x` },
				{ Key: `${brand}/${badge}/${shortId}/container/webp/1x` },
				{ Key: `${brand}/${badge}/${shortId}/container/jpg` },
				{ Key: `${brand}/${badge}/${shortId}/container/webp` },
				{ Key: `${brand}/${badge}/${shortId}/container` },
			);
		}
	});

	return paths;
}

export default galleryPathsToRemove;
