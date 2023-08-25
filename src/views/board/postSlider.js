import React, { useEffect, useState } from "react";
import "./postView.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function G_slider(props) {
  const [imageSet, setImageSet] = useState("");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <ArrowBackIosNewIcon sx={{color:'white', width:'2vw'}} />,
    nextArrow: <ArrowForwardIosIcon sx={{color:'gray', width:'2vw'}} />,

  };

  useEffect(() => {
    const image = new Image();
    image.src = props.info.image;
    const width = image.naturalWidth;
    const height = image.naturalHeight;

    if(width >= height) {  // 가로로 긴 사진
      setImageSet('post-image-row');
      console.log("가로 사진");
    }
    else {    // 세로로 긴 사진
      setImageSet('post-image-column');
      console.log("세로 사진");
    }
  }, [props.info.image]);


  return (
    <div className={`${imageSet}`}>
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
