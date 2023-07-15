import React from "react";
import List_Component from "./list_Component";

function Image_Collection(props) {
    console.log(props)
    const images = [
        {
            id: 1,
            img:"https://media.basecamp.team/media/travelagent/420/imagecontent/%EB%8F%99%EC%9C%A0%EB%9F%BD.jpg",
            alt: "castle"
        },
        {
            id: 2,
            img:"https://d2ur7st6jjikze.cloudfront.net/landscapes/4652_large_square_1535619901.jpg?1535619901",
            alt: "Bangkok"
        },
        {
            id: 3,
            img:"https://thedragontrip.com/wp-content/uploads/2019/11/jan-gottweiss-3HnSSg48x_Q-unsplash-500x500.jpg",
            alt: "Bangkok"
        },
        {
            id: 4,
            img:"https://thedragontrip.com/wp-content/uploads/2019/11/nicki-eliza-schinow-BjJP2TN8WoI-unsplash-500x500.jpg",
            alt: "Bangkok"
        },
        {
            id: 5,
            img:"https://www.akc.org/wp-content/uploads/2018/08/nervous_lab_puppy-studio-portrait-lg-500x500.jpg",
            alt: "Bangkok"
        },
        {
            id: 6,
            img:"https://farm6.staticflickr.com/5343/30212993894_85351f21ba.jpg",
            alt: "Bangkok"
        },
        {
            id: 7,
            img:"https://ecudemo67466.cafe24.com/web/product/big/201707/13_shop1_727325.jpg",
            alt: "Bangkok"
        },
        {
            id: 8,
            img:"https://t1.daumcdn.net/cfile/tistory/214DAA405723694414",
            alt: "Bangkok"
        },
        {
            id: 9,
            img:"https://d2ur7st6jjikze.cloudfront.net/landscapes/4652_large_square_1535619901.jpg?1535619901",
            alt: "Bangkok"
        },
    ]
    return(
        <ul>
            {props.userLocationInfo.map((element, index) =>
                <li>
                    <List_Component key={index} listInfo={element}/>
                </li>
                )}
        </ul>
    )
}

export default Image_Collection