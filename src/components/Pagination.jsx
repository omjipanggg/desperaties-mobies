import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Pagination(props) {
	const pages = [];
	for (let i=1; i <= 100; i++) {
		pages.push(i);
	}

	let pageDecremental = null;
	if (props.minLimit >= 1) {
		pageDecremental = <li className="pagination-item flex" onClick={props.skipPrev}>&hellip;</li>
	}

	let pageIncremental = null;
	if (pages.length > props.maxLimit) {
		pageIncremental = <li className="pagination-item flex" onClick={props.skipNext}>&hellip;</li>
	}

	const pageNumbers = pages.map((page) => {
		if (page <= props.maxLimit && page > props.minLimit) {
			return (
				<li key={page} className={`pagination-item flex ${props.currentPage === page ? 'active' : null}`} onClick={(e) => props.change(Number(e.target.textContent))}>
					{page}
				</li>
			)
		} else {
			return null;
		}
	});

	return (
		<section id="pagination">
			<div className="container">
				<ul className="pagination-list flex">
					<li className={`pagination-item flex arrow ${props.currentPage === pages[0] ? 'disabled' : null}`} onClick={props.currentPage === pages[0] ? null : props.prev}>
						<FontAwesomeIcon icon={faChevronLeft} />
					</li>
					{ pageDecremental }
					{ pageNumbers }
					{ pageIncremental }
					<li className={`pagination-item flex arrow ${props.currentPage === pages[pages.length-1] ? 'disabled' : null}`} onClick={props.currentPage === pages[pages.length-1] ? null : props.next}>
					<FontAwesomeIcon icon={faChevronRight} />
					</li>
				</ul>
			</div>
		</section>
	);
}