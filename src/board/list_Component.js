import React from "react";
import './list_Component.css'

function List_Component(props) {
    return (
        <div className="list_com">
            <a href="/">
                <img src={props.img} alt={props.alt}></img>
                <p>좋아요 개수</p>
                <h4>리뷰 제목</h4>
                <p>위치 정보</p>
                <p>별 갯수</p>
            </a>
        </div>
    )
}

export default List_Component