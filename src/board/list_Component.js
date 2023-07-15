import React from "react";
import './list_Component.css'

function List_Component(props) {
    console.log(props)
    return (
        <div className="list_com">
            <a href="/">
                <img src={props.listInfo.image} alt={props.listInfo.image}></img>
                <p>좋아요 개수: {props.listInfo.like_count}</p>
                <h4>{props.listInfo.title}</h4>
                <p>위치 정보: {props.listInfo.name}</p>
                <p>별 갯수: {props.listInfo.star_count}</p>
            </a>
        </div>
    )
}

export default List_Component