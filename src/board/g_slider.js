import React from "react";
import './gesimool.css'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function G_slider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    }
    return (
        <div className="gesimoolSlide">
            <Slider {...settings}>
                <div>
                    <img src="https://farm5.staticflickr.com/4466/36906009863_625ce02e9f.jpg" alt="흑백"></img>
                </div>
                <div>
                    <img src="https://i.redd.it/80jykz32log21.png" alt="노을"></img>
                </div>
                <div>
                    <img src="https://dthezntil550i.cloudfront.net/mv/latest/mv2108252209258160004025251/72d05929-af16-48b7-914e-9043c1e95142.png" alt="소녀"></img>
                </div>
                <div>
                    <img src="https://m.elliegolucky.com/web/product/tiny/202205/ee7973325a6007a0a78db0217fb590ec.jpg" alt="액자"></img>
                </div>
                <div>
                    <img src="https://applebag.co.kr/shop/item_images/zoom1/284787.jpg" alt="파우치"></img>
                </div>
                <div>
                    <img src="https://sheetbada.com/web/product/big/cv630good500.jpg" alt="그림"></img>
                </div>
            </Slider>
        </div>
    )
}

export default G_slider