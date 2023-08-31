import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Navbar(props) {
	const { toggleMode, searchChange } = props;
	const [searchValue, setSearchValue] = React.useState('');

	const handleChange = (e) => {
		const param = e.target.value;
		setSearchValue(param)
		searchChange(param);
	}

	const handleSubmit = (e) => {
	}

	return (
		<nav className="navbar" id="navbar">
		  <div className="container flex">
			<div className="nav-left flex">
				<div className="nav-brand">
					<h2 className="nav-title">Mobies</h2>
					<p className="nav-subtitle">Watch me, maybe?</p>
				</div>
				<div className="nav-mode">
					<div className="block">
						<span className="bar" onClick={toggleMode}></span>
					</div>
				</div>
			</div>
			<div className="nav-right">
				<form onSubmit={handleSubmit} className="form flex">
					<input
						type="text"
						className="form-control form-search"
						onChange={handleChange}
						placeholder="Search"
						name="query"
						autoComplete="off"
						/>
					{/*
					<button type="submit" className="btn btn-search">
						<FontAwesomeIcon icon={faSearch} />
					</button>
					*/}
				</form>
			</div>
		  </div>
		</nav>
	);
}
