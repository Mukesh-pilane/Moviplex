import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CastCarousel.css"
import {Link} from "react-router-dom"
import { ArrowLeft, ArrowRight, DeafaultCastIcon } from '../allAvg';



const CastCarousel = ({casts}) => {

    
    const CastCard = ({cast})=>{
      return(
          <div className="castCard">
              {
                  cast.profile_path ?
                  <img src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt={cast.name} />
              : <DeafaultCastIcon />
              }
          </div>
      )
    }
    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
          <button className="castCarousel__carousel-arrow castCarousel__arrow-prev" onClick={onClick}>
            <ArrowLeft height="1.5rem" width="1.5rem"/>
          </button>
        );
      };
      
      const NextArrow = (props) => {
        const { onClick } = props;
        return (
          <button className="castCarousel__carousel-arrow castCarousel__arrow-next" onClick={onClick}>
            <ArrowRight height="1.5rem" width="1.5rem"/>
          </button>
        );
      };
      const [totalShow, setTotalShow] = useState(null);
      const sliderElement = useRef();
    
      const changeTotalShow = () => {
        let totalItems = Math.round(sliderElement.current.offsetWidth / 140);
        if (totalItems > casts.length) {
          totalItems = casts.length;
        }
        setTotalShow(totalItems);
      };

      useEffect(() => {
        changeTotalShow();
        window.addEventListener('resize', changeTotalShow);
        return () => window.removeEventListener('resize', changeTotalShow);
      }, []);
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      swipeToSlide: true,
      speed: 500,
      slidesToShow: totalShow,
      slidesToScroll: 1,
        prevArrow: <PrevArrow/>,
        nextArrow: <NextArrow />,
      };
    
  return (
    <>
    <div className="castCarousel">
    <div className="castCarouselContainer" ref={sliderElement}>
    <h1>The Cast</h1>
    <Slider {...settings} className='castCarousel__slide'>
        {casts.map((cast, index) =>{
            return(
                <CastCard key={index} cast={cast} />
            )
        })}
    </Slider>
    </div>
    </div>
    </>
  )
}

export default CastCarousel