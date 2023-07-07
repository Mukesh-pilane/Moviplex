import {useState} from "react"
import "./Header.css"
import { Link } from "react-router-dom"
import {MenuIcon} from "../allAvg"
const Header = () => {
  
  const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }
  
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
                        <Link className="sd-link" to="/movies/popular" style={{textDecoration: "none"}}>Popular
                        </Link>
                        </li>
                        <li>
                        <Link className="sd-link" to="/movies/top_rated" style={{textDecoration: "none"}}>Top Rated</Link>
                        </li>
                        <li>
                <Link className="sd-link" to="/movies/upcoming" style={{textDecoration: "none"}}>Upcoming</Link>
                </li>
                </ul>
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