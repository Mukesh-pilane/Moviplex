import React, {useEffect, useState} from "react"
import "./movieList.css"
import { useParams, useLocation } from "react-router-dom"
import axios from "axios"
import Cards from "../card/Card"


const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const location = useLocation()
    const path = location.pathname.split('/')
    const type = path[1]
    const subtype = path[2]
    const genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]
    let url
    if(type === 'genre'){
        const genre = genres.find((genre) => genre.name === subtype);
        url = `https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&with_genres=${genre.id}`
    }else{
        url =`https://api.themoviedb.org/3/movie/${subtype ? subtype : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
    }

    useEffect(() => {
        getData()
    }, [subtype])

    const getData = () => {
        axios.get(url)
          .then(response => {
            const data = response.data;
            setMovieList(data.results);
          })
          .catch(error => {
            console.log(error);
          });
      }
      

    return (
        <div className="movie__list">
            <h2 className="list__title">{(subtype ? subtype : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map((movie, index) => {
                        return <Cards movie={movie} key={index} />
})
                }
            </div>
        </div>
    )
}

export default MovieList