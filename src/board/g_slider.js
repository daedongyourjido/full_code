import React from "react";
import "./gesimool.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function G_slider(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="gesimoolSlide">
      <Slider {...settings}>
        <div>
          <img src={props.info.image} alt="흑백"></img>
        </div>
        <div>
          <img src={props.info.image} alt="노을"></img>
        </div>
        <div>
          <img src={props.info.image} alt="소녀"></img>
        </div>
        <div>
          <img src={props.info.image} alt="액자"></img>
        </div>
        <div>
          <img src={props.info.image} alt="파우치"></img>
        </div>
        <div>
          <img src={props.info.image} alt="그림"></img>
        </div>
      </Slider>
    </div>
  );
}

export default G_slider;
