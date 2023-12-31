import React, {useEffect, useState} from "react"
import "./movie.css"
import { useParams } from "react-router-dom"
import CastCarousel from "../../components/carousel/CastCarousel"
import tmdbapi from "../../tmdbapi"
import MovieCarousel from "../../components/carousel/MovieCarousel"
const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const [casts, setCasts] = useState()
    const [recommendations, setRecommendations] = useState()
    const { id, page} = useParams()

    useEffect(() => {
        getMovieData()
        getCastData()
        getVideo()
        getRecommendations()
        window.scrollTo(0,0)
        return ()=>{
            setCasts();
            setMovie();
            setRecommendations();
        }
    }, [])
    


    const getMovieData = async () => {
          try {
            const res = await tmdbapi.get(`/movie/${id}`, {
                params: {
                  append_to_response: 'videos',
                },
              });
              setMovie(res.data);
          } catch (err) {
            console.log(err);
          }
      };
      
    const getCastData = async () =>{
        try {
            const res = await tmdbapi.get(`/movie/${id}/credits`);
            setCasts(res.data.cast);
        } catch (err) {
            console.log(err);
        }
    }
    const getVideo = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=4e44d9029b1270a757cddc766a1bcb63`)
        .then(res => res.json())
        .then(data => {

        })
    }
    const getRecommendations =  async () => {
        try {
          const res = await tmdbapi.get(`/movie/${id}/recommendations`,{
            params: {
                page
            }
          } );
          setRecommendations(res?.data)

        } catch (err) {
        //   history.push(process.env.PUBLIC_URL + '/error');
          console.log(err)
        }
      };
      


    return (
      <>
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            <div className="movie__detail">
                <div className="movie__detail_container">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i className="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <div className="movie__genre" key={genre.id}>{genre.name}</div>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        {   casts?
                <CastCarousel casts={casts}/>
                :null
            }
        <div className="movie__links">
            <div className="movie__links-container">
                <div className="movie__links_heading">Useful Links</div>
                <div className="movie__links_btn">
                                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank"
                    style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button gradient-background">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button gradient-background">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                </div>
            </div>
            </div>

            {
            recommendations?
        <MovieCarousel data={recommendations} keyword={"Recommended movies"}/>
        :null
        }
            {
                currentMovieDetail?.production_companies ?
                <div className="movie__production">
                <div className="movie__production-container">

                        <div className="movie__production_heading">Production companies</div>
                <div className="movie__production_list">
                                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map((company, index) => {
                        return (<React.Fragment  key={index}>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage" >
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </React.Fragment>)
                    })
                }
                </div>
                </div>
            </div>
            :null
            }
           
    
            
        </>
    )
}

export default Movie