import React, { useState, useEffect } from 'react';
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

const Carousel = ({keyword}) => {
  const [movieList, setMovieList] = useState([]);
  let url = `https://api.themoviedb.org/3/movie/${keyword ? keyword : 'popular'}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    pauseOnHover: true,
    variableWidth:true,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
    prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow />,
  };


  const getData = () => {
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        setMovieList(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, [keyword]);

  return (
    <div className="mySlickCarouselContainer">
      <h1>{keyword.toUpperCase()}</h1>
    <Slider {...settings} className='mySlickCarousel'>
      {movieList.map((movie, index) => {
        return <Cards movie={movie} key={index} />;
      })}
    </Slider>
    </div>
  );
};

export default Carousel;
