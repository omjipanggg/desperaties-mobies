import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function MoviesList(props) {
	// let newOverview = props.context.overview.substr(0, 100);
	// newOverview = newOverview.substr(0, Math.min(newOverview.length, newOverview.lastIndexOf(" ")));
	return (
		<div className={`movie-item ${props.context.adult ? 'nsfw' : 'safe' }`}>
			<div className="movie-img">
				<img src={`https://image.tmdb.org/t/p/w500${props.context.poster_path}`} alt={props.context.title} />
			</div>
			<div className="movie-info flex">
				<a className="movie-title" href={`https://www.youtube.com/results?search_query=${props.context.title}`} target="blank">{ props.context.title }</a>
			</div>
			<div className={`votes flex ${props.context.vote_average >= 7 ? 'high' : 'average'}`}>
			<FontAwesomeIcon icon={faStar}/>
			{props.context.vote_average}
			</div>
		</div>
	);
}