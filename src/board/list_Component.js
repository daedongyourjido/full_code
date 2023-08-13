import React from "react";
import './list_Component.css'

function List_Component(props) {

    return (
        <div className="list_com">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href={'#'}>
                <img src={props.img} alt={props.alt} />
                <p>좋아요 개수: {props.like_count}</p>
                <h4>리뷰 제목: {props.title}</h4>
                <p>위치 정보: {props.name}</p>
                <p>별 갯수: {props.star_count}</p>
            </a>
        </div>
    )
}

export default List_Component