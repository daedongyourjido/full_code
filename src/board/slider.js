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

function SimpleSlider(props) {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    }
    console.log(props)
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태를 저장할 state
    const [modalInfo, setModalInfo] = useState(null)
    // 모달 열기 함수
    const openModal = (info) => {

      setIsModalOpen(true);
        setModalInfo(info)

    };

    // 모달 열기 함수
   /* const openModal = (image) => {
      setIsModalOpen(true);
    }; */
  
    // 모달 닫기 함수
    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
      <div className="contentslide">
        <Slider {...settings}>
            {
                props.userLocationInfo.map(info => (
                    <div>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href={'#'} onClick={() => openModal(info)}><img src={info.image} alt="흑백"></img></a>
                    </div>
                ))
            }
        </Slider>

        <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="modal-content"
                overlayClassName="modal-overlay"
                style={customOverlayStyle} // 오버레이 스타일을 적용
            >
                <Gesimool
                    info={modalInfo}
                    open={isModalOpen}
                />
            </Modal>
      </div>
    )
  }

export default SimpleSlider