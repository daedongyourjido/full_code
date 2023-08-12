import React, { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from "react-modal";
import Gesimool from "./gesimool";

const customOverlayStyle = {
  overlay: {

    zIndex: 9999, // 모달을 최상위 레이어에 표시
  },
};

function SimpleSlider() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    }

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태를 저장할 state

    // 모달 열기 함수
    const openModal = (image) => {
      setIsModalOpen(true);
    };
  
    // 모달 닫기 함수
    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
      <div className="contentslide">
        <Slider {...settings}>
          <div>
            <a onClick={() => openModal()}><img src="https://farm5.staticflickr.com/4466/36906009863_625ce02e9f.jpg" alt="흑백"></img></a>
          </div>
          <div>
            <a onClick={() => openModal()}><img src="https://i.redd.it/80jykz32log21.png" alt="노을"></img></a>
          </div>
          <div>
            <a onClick={() => openModal()}><img src="https://dthezntil550i.cloudfront.net/mv/latest/mv2108252209258160004025251/72d05929-af16-48b7-914e-9043c1e95142.png" alt="소녀"></img></a>
          </div>
          <div>
            <a onClick={() => openModal()}><img src="https://m.elliegolucky.com/web/product/tiny/202205/ee7973325a6007a0a78db0217fb590ec.jpg" alt="액자"></img></a>
          </div>
          <div>
            <a onClick={() => openModal()}><img src="https://applebag.co.kr/shop/item_images/zoom1/284787.jpg" alt="파우치"></img></a>
          </div>
          <div>
            <a onClick={() => openModal()}><img src="https://sheetbada.com/web/product/big/cv630good500.jpg" alt="그림"></img></a>
          </div>
        </Slider>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="modal-content"
          overlayClassName="modal-overlay"
          style={customOverlayStyle} // 오버레이 스타일을 적용
            >
          <Gesimool />
        </Modal> 
      </div>
    )
  }

export default SimpleSlider