import React from 'react';
import axios from 'axios';

import Pulse from './pulse.svg';
import Logo from './logo.png';

import './App.css';
import './media.css';

import Navbar from './components/Navbar.jsx';
import Title from './components/Title.jsx';
import Movies from './components/MoviesList.jsx';
import Pagination from './components/Pagination.jsx';
import Footer from './components/Footer.jsx';

const PAGE_KEY = 'page';
const MODE_KEY = 'mode';
const PARAM_KEY = 'param';
const API_KEY = "41a33f6c1fd98de64e8dcd571441e408";
// const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWEzM2Y2YzFmZDk4ZGU2NGU4ZGNkNTcxNDQxZTQwOCIsInN1YiI6IjYxZDA0ZTM4N2I3YjRkMDA5NGY5NjUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vwfAwORLdrmkXeXY-ZV2sJO-nawVw0xBSbw1WqV6LlM";

export default function App() {
  const pageLimit = 4;
  const [search, setSearch] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [mode, setMode] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [maxLimit, setMaxLimit] = React.useState(4);
  const [minLimit, setMinLimit] = React.useState(0);

  React.useEffect(() => {
    const storedPage = JSON.parse(localStorage.getItem(PAGE_KEY));
    const storedMode = JSON.parse(localStorage.getItem(MODE_KEY));
    const storedSearch = JSON.parse(localStorage.getItem(PARAM_KEY));
    if (storedSearch) { setSearch(search); }
    if (storedPage) { setCurrentPage(storedPage); }
    if (storedMode) {
      setMode(storedMode);
      document.querySelector('body').classList.add('nox');
      document.querySelector('.bar').classList.add('active');
    }
  }, []);

  React.useEffect(() => {
    const getResponse = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${currentPage}&with_keywords=${search}`);
      if (response.status !== 200) {
        throw new Error("Could not be fetched.");
      } else {
        return response;
      }
    }
    setLoading(true);
      getResponse().then((result) => {
        setMovies(result);
        setLoading(false);
      }).catch((er) => {
        console.error(er.message);
      });
      localStorage.setItem(PAGE_KEY, JSON.stringify(currentPage));
  }, [currentPage, search]);

  React.useEffect(() => {
    localStorage.setItem(MODE_KEY, JSON.stringify(mode));
  }, [mode]);

  const changePage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const prevPage = () => {
    if (((currentPage-1) % pageLimit) === 0) {
      setMinLimit(minLimit - pageLimit);
      setMaxLimit(maxLimit - pageLimit);
    }
    setCurrentPage((item) => item-1);
  };

  const nextPage = () => {
    if ((currentPage+1) > maxLimit) {
      setMinLimit(minLimit + pageLimit);
      setMaxLimit(maxLimit + pageLimit);
    }
    setCurrentPage((item) => item+1);
  };

  const onePagePrev = () => {
    setMinLimit(item => item - pageLimit);
    setMaxLimit(item => item - pageLimit);
    setCurrentPage(minLimit-pageLimit+1);
  };

  const onePageNext = () => {
    setMinLimit(item => item + pageLimit);
    setMaxLimit(item => item + pageLimit);
    setCurrentPage(maxLimit+1);
  };

  const paginationContext = {
    currentPage,
    minLimit,
    maxLimit,
  };

  const toggleMode = (e) => {
    e.target.classList.toggle('active');
    document.querySelector('body').classList.toggle('nox');
    setMode(!mode);
  };

  const handleSearch = (e) => {
    setSearch(e);
  };

  return (
    <React.Fragment>
      <Navbar toggleMode={toggleMode} searchChange={handleSearch} />
      <section id="movies">
        <div className="container flex">
        { loading ? <div className="overlay"><div className="floating-center"><img src={Pulse} alt="Loading" /></div></div> : movies.data.results.map((item) => <Movies key={item.id} context={item}/>) }
        </div>
      </section>
      <Pagination
        {...paginationContext}
        context={movies}
        prev={prevPage}
        next={nextPage}
        change={changePage}
        skipPrev={onePagePrev}
        skipNext={onePageNext}
        />
      <Footer />
    </React.Fragment>
  );
}