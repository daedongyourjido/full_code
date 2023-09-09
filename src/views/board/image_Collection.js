import React, { useState } from "react";
import Modal from "react-modal";
import PostView from "./postView";
import Grid from "@mui/material/Grid";
import "./board.css";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

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
  };
  const handleMouseOut = () => {
    setActivePost(null);
  };

  // 모달 열기 함수
  const openModal = (info) => {
    setIsModalOpen(true);
    setModalInfo(info);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <Grid container spacing={2}>
        {props.userLocationInfo.map((info, index) => (
          <>
            <Grid
              key={info.id}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={() => handleMouseOut()}
              onClick={() => openModal(info)}
              item
              xs={4}
            >
              {/* 여기서 각 게시물 info 넘어감 */}
              {activePost === index ? (
                <div className="post-mouseover">
                  <div className="post-title">
                    <ChatBubbleIcon sx={{ height: "2vh", marginTop: "2vh" }} />
                    <span>{info.title}</span>
                  </div>
                  <div className="post-like">
                    <FavoriteIcon sx={{ height: "2vh", marginTop: "2.1vh" }} />
                    <span>{info.like_count}</span>
                  </div>
                  <div className="post-location">
                    <FmdGoodIcon sx={{ height: "2vh", marginTop: "2.2vh" }} />
                    <span>{info.name}</span>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <img
                src={info.image}
                className="post-thumbnail"
                postId={info.id}
                alt="..."
              />
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
        <PostView info={modalInfo} open={isModalOpen} closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default Image_Collection;
