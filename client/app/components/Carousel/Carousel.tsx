import React, { EventHandler, Fragment, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import "./Carousel.css";

export const Carousel = ({ data }: { data: any[] }) => {
  const [slide, setSlide] = useState<Number>(0);
  
  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : +slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : +slide - 1);
  };

  const selectSlide = (e: React.MouseEvent, index: Number) => {
    e.preventDefault();
    setSlide(index);
  }

  return (
    <div className="carousel">
      {data.length > 1 ? <KeyboardArrowLeft
        onClick={prevSlide}
        className="arrow arrow-left"/> : ''}
      {data.map((item, index) => {
        return (
          <img
            src={item.filePath}
            alt={item.fileName}
            key={index}
            className={slide === index ? "slide" : "slide slide-hidden"}
          />
        );
      })}
      {data.length > 1 ? <Fragment>
      <KeyboardArrowRight
        onClick={nextSlide}
        className="arrow arrow-right"/>
      <span className="indicators">
        {data.map((_, index) => {
          return (
            <button
              key={index}
              className={
                slide === index ? "indicator" : "indicator indicator-inactive"
              }
              onClick={(e) => selectSlide(e, index)}
            ></button>
          );
        })}
      </span>
      </Fragment>
       : '' }
    </div>
  );
};