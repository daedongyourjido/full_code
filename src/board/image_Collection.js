import React, { useState } from "react";
import List_Component from "./list_Component";
import Modal from "react-modal";
import Gesimool from "./gesimool";
import Grid from '@mui/material/Grid';

const customOverlayStyle = {
    overlay: {

      zIndex: 9999, // 모달을 최상위 레이어에 표시
    },
};

function Image_Collection(props) {

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태를 저장할 state

    // 모달 열기 함수
    const openModal = (image) => {
      setIsModalOpen(true);
    };
  
    // 모달 닫기 함수
    const closeModal = () => {
      setIsModalOpen(false);
    };

    return(
        <div>
            <Grid container spacing={2}>
                {props.userLocationInfo.map((info) => (
                    <Grid key={info.id} onClick={() => openModal(info)} item xs={4}>
                        <List_Component
                            img={info.image}
                            alt={info.id}
                            like_count={info.like_count}
                            name={info.name}
                            star_count={info.star_count}
                            title={info.title}
                        />
                    </Grid>
                    )
                )}
            </Grid>
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

export default Image_Collection