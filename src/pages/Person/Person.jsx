import React, { useState, useEffect } from 'react'
import tmdbapi from '../../tmdbapi'
import { useParams } from 'react-router-dom'
import "./Person.css"

const Person = () => {
  const [person, setPerson] = useState()
  const {id} =useParams('id')
    const getPerson = async () =>{
      try {
        const res = await tmdbapi.get(`/person/${id}`);
        setPerson(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    useEffect(() => {
      getPerson()
      console.log(person);
      window.scrollTo(0,0)
  }, [])

  return (
    <div className="person">
      <div className="tmdb_container">
        <div className="person__detail">
          <img className="person__detail-img" src={`https://image.tmdb.org/t/p/original${person?.profile_path}`} alt="" />
          <div className="person__detail_info">
            <h1>{person?.name}</h1>
            <span>{person?.birthday}</span>
            <p>{person?.biography}</p>
            <a href={"https://www.imdb.com/title/" + person?.imdb_id}><p><span className="movie__Button gradient-background">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Person