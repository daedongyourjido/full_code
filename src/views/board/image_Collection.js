import React, { useState } from "react";
import Modal from "react-modal";
import Gesimool from "./postView";
import Grid from "@mui/material/Grid";
import './board.css';

const customOverlayStyle = {
  overlay: {
    zIndex: 9999, // 모달을 최상위 레이어에 표시
  },
};



function Image_Collection(props) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태를 저장할 state
  const [modalInfo, setModalInfo] = useState(null);
  const [activePost, setActivePost] = useState(null);

  const handleMouseOver = (index) => {
    setActivePost(index);
  }
  
  const handleMouseOut = () => {
    setActivePost(null);
  }

  // 모달 열기 함수
  const openModal = (info) => {
    setIsModalOpen(true);
    setModalInfo(info);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {props.userLocationInfo.map((info, index) => (
          <>
            <Grid key={info.id} 
                  onMouseOver={() => handleMouseOver(index)} 
                  onMouseOut={() => handleMouseOut()}
                  onClick={() => openModal(info)} item xs={4}>
              { activePost === index ? 
                  <div className='post-mouseover'>
                    <p style={{marginBottom:'0px'}}>{info.title}</p>
                    <p>{info.like_count}</p>
                    <p style={{marginTop:'0px'}}>{info.name}</p>
                  </div> : <></> }
              <img src={info.image} 
                    className='post-container'
                    alt='...'  />
            </Grid>
          </>
        ))}
      </Grid>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        style={customOverlayStyle} // 오버레이 스타일을 적용
      >
        <Gesimool info={modalInfo} open={isModalOpen} />
      </Modal>
    </div>
  );
}

export default Image_Collection;
