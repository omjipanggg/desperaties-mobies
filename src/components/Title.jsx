import React from 'react';

export default function Title(props) {
	const { img } = props;
	return (
		<section id="carousel">
			<div className="container flex">
				<img src={img} alt={img} />
			</div>
		</section>
	);
}
