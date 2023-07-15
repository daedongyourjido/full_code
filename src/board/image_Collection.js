import React from "react";
import List_Component from "./list_Component";

function Image_Collection(props) {
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
