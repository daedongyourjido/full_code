import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SimpleSlider(props) {
  console.log(props)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    }
    return (
      <div className="contentslide">
        <Slider {...settings}>
          {
            props.userLocationInfo.map((element, index)=> (
                index < 10 ?
                <div>
                  <a href="/"><img src={element.image} alt="흑백"></img></a>
                </div>
                    :
                    ''
            ))
          }
        </Slider>
      </div>
    )
  }

export default SimpleSlider