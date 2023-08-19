import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function StandardImageList(props) {
  console.log(props);
  return (
    <ImageList
      sx={{ width: 800, height: 650, marginLeft: 20, marginTop: 3 }}
      cols={3}
      rowHeight={184}
      gap={20}
    >
      {props?.placeImages ? (
        props.placeImages.map((item, index) => (
          <ImageListItem key={index}>
            <img src={item} srcSet={item} alt={item} loading="lazy" />
          </ImageListItem>
        ))
      ) : (
        <div>rendering</div>
      )}
    </ImageList>
  );
}
