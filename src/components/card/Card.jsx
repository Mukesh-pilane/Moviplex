import React, {useEffect, useState} from "react"
import "./card.css"
import { Link } from "react-router-dom"
import Loader from "../Loader/Loader"
import LazyLoad from 'react-lazyload';
import { Nothing } from "../allAvg";
const Cards = ({movie}) => {

    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      return () => setLoaded(false);
    }, []); 

    return <>
    
     <LazyLoad height={300} offset={200}>
        <Link to={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards">
            {!loaded ? (
            <Loader />
        ) : null}
                <img 
                          error={error ? 1 : 0}
                          onLoad={() => setLoaded(true)}
                          style={!loaded ? { display: 'none' } : {}}
                          onError={e => {
                            setError(true);
                            if (e.target.src !== `${Nothing}`) {
                              e.target.src = `${Nothing}`;
                            }
                          }}
                
                className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} />
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie.original_title:""}</div>
                    <div className="card__runtime">
                        {movie?movie.release_date:""}
                        <span className="card__rating">{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                    </div>
                    <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                </div>
            </div>
        </Link>
        </LazyLoad>
    </>
}

export default Cards