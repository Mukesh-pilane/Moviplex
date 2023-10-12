import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Cards from '../card/Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./MovieCarousel.css";
import { ArrowRight, ArrowLeft } from '../allAvg';

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="slick-carousel-arrow slick-arrow-prev" onClick={onClick}>
      <ArrowLeft height="1.5rem" width="1.5rem"/>
    </button>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="slick-carousel-arrow slick-arrow-next" onClick={onClick}>
      <ArrowRight height="1.5rem" width="1.5rem"/>
    </button>
  );
};

const Carousel = ({keyword, data}) => {
  const movieList = data?.results
  const [totalShow, setTotalShow] = useState(null);
  const sliderElement = useRef();

  const settings = {
    dots: false,
    infinite: true,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: totalShow,
    slidesToScroll: 1,
    prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow />,
  };

  const changeTotalShow = () => {
    let totalItems = Math.round(sliderElement.current.offsetWidth / 220);
    if (totalItems > movieList?.length) {
      totalItems = movieList?.length;
    }
    setTotalShow(totalItems);
  };
  
  useEffect(() => {
    changeTotalShow();
    window.addEventListener('resize', changeTotalShow);
    return () => window.removeEventListener('resize', changeTotalShow);
  }, [movieList]);
  return (
    <div className="movieList">

    <div className="mySlickCarouselContainer"  ref={sliderElement}>
      <h1>{keyword?.toUpperCase()}</h1>
    <Slider {...settings} className='mySlickCarousel'>
      {movieList?.map((movie, index) => {
        return <Cards movie={movie} key={index} />;
      })}
    </Slider>
    </div>
    </div>
  );
};

export default Carousel;
