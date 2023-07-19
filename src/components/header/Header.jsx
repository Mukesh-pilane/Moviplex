import {useState} from "react"
import "./Header.css"
import { Link } from "react-router-dom"
import {MenuIcon} from "../allAvg"
const Header = () => {
  
  const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }
    const genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]

    return (
      <>
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
            </div>
            <div onClick={ToggleSidebar} >
                            <MenuIcon />
            </div>
        </div>
        <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
                        <div className="sd-header">
                            <h4 className="mb-0">Discover</h4>
                            <div className="menu-close-btn" onClick={ToggleSidebar}><i className="fa fa-times"></i></div>
                        </div>
                        <div className="sd-body">
                        <ul>
                        <li>
                        <Link className="sd-link" to="/movies/popular" style={{textDecoration: "none"}}><span><i className="fa-solid fa-heart"></i></span>  Popular
                        </Link>
                        </li>
                        <li>
                        <Link className="sd-link" to="/movies/top_rated" style={{textDecoration: "none"}}><i className="fa-sharp fa-solid fa-square-poll-vertical"></i> Top Rated</Link>
                        </li>
                        <li>
                <Link className="sd-link" to="/movies/upcoming" style={{textDecoration: "none"}}><i className="fa-solid fa-calendar"></i> Upcoming</Link>
                </li>
                </ul>
                <div className="genres">
                        <h4>
                        Genres</h4>
                    <ul>
                    {
                      genres.map(function(item, index){
                      const {name:genre, id}=item
                        return(
                                                <li key={index}>
                        <Link className="sd-link" to={`/genre/${genre}`} style={{textDecoration: "none"}}><span><i className="fa-solid fa-tag"></i></span> {genre}
                        </Link>
                        </li>
                        )
                      })
                    }
                </ul>
                        </div>
                        </div>
                    </div>
                    <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
           
           </>
    )
}

export default Header


/*<Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>*/