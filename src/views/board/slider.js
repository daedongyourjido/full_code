import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";
import PostView from "./postView";
import "./board.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
    arrows: true,
    prevArrow: <ArrowBackIosNewIcon sx={{ color: "white", width: "2vw" }} />,
    nextArrow: <ArrowForwardIosIcon sx={{ color: "white", width: "2vw" }} />,
  };
  console.log(props);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태를 저장할 state
  const [modalInfo, setModalInfo] = useState(null);
  // 모달 열기 함수
  const openModal = (info) => {
    setIsModalOpen(true);
    setModalInfo(info);
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
    <div className="board-slider">
      <Slider {...settings}>
        {props.userLocationInfo.map((info) => (
          <div>
            <img
              src={info.image}
              className="slider-image"
              onClick={() => openModal(info)}
              alt="..."
            />
          </div>
        ))}
      </Slider>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        style={customOverlayStyle} // 오버레이 스타일을 적용
      >
        <PostView info={modalInfo} open={isModalOpen} />
      </Modal>
    </div>
  );
}

export default SimpleSlider;
