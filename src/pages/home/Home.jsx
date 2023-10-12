import React, { useEffect, useState } from "react"
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/MovieList";
import {ArrowLeft, ArrowRight} from '../../components/allAvg.jsx'
import MovieCarousel from "../../components/carousel/MovieCarousel";
import tmdbapi from "../../tmdbapi"

const Home = () => {

    const [ popularMovies, setPopularMovies ] = useState()
    const [ upcomingMovies, setUpcomingMovies ] = useState()
    const [ratedMovies, setRatedMovies ] = useState()


    const getData = async () => {
      try {
        const res = await tmdbapi.get(`/movie/popular`);
        setPopularMovies(res.data)
        const res1 = await tmdbapi.get(`/movie/upcoming`);
        setUpcomingMovies(res1.data)
        const res2 = await tmdbapi.get(`/movie/top_rated`);
        setRatedMovies(res2.data)

      } catch (err) {
      //   history.push(process.env.PUBLIC_URL + '/error');
        console.log(err)
      }
      };

    useEffect(() => {
      getData()
      return ()=>{
        setUpcomingMovies()
        setRatedMovies()
      }
    }, [])

    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                      hasPrev && (
                        <button type="button" onClick={onClickHandler} title={label} className="carousel-arrow arrow-prev">
            
            <ArrowLeft height="1.5rem" width="1.5rem"/>
                        </button>
                      )
                    }
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                      hasNext && (
                        <button type="button" onClick={onClickHandler} title={label} className="carousel-arrow arrow-next">
                          < ArrowRight height="1.5rem" width="1.5rem"/>
                        </button>
                      )
                    }
                    className="my-carousel"
                >
                    {
                        popularMovies?.results.map((movie,index)=> (
                            <Link 
                            key={index}
                            style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__overlay-container">
                                    <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average :""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieCarousel keyword="popular" data={popularMovies}/>
                <MovieCarousel keyword="upcoming" data={upcomingMovies}/>
                <MovieCarousel keyword="top_rated" data={ratedMovies} />
            </div>
        </>
    )
}

export default Home