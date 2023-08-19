import React, { useState } from "react";
import Modal from "react-modal";
import Gesimool from "./gesimool";
import Grid from "@mui/material/Grid";

const customOverlayStyle = {
  overlay: {
    zIndex: 9999, // 모달을 최상위 레이어에 표시
  },
};

function Image_Collection(props) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태를 저장할 state
  const [modalInfo, setModalInfo] = useState(null);
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
        {props.userLocationInfo.map((info) => (
          <>
            <Grid key={info.id} onClick={() => openModal(info)} item xs={4}>
              <div className="list_com">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a id={info.id} href={"#"}>
                  <img src={info.image} alt={info.id} />
                  <h4>리뷰 제목: {info.title}</h4>
                  <p>좋아요 개수: {info.like_count}</p>
                  <p>위치 정보: {info.name}</p>
                  <p>별 갯수: {info.star_count}</p>
                </a>
              </div>
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
