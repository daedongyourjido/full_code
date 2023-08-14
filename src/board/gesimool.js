import React, {useEffect, useRef, useState} from "react";
import './gesimool.css';
import Gslider from "./g_slider";
import {useNavigate} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from "axios";

function Gesimool(props) {
    const navigate = useNavigate();
    const countRef = useRef(0);
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    useEffect(() => {

        if(countRef.current === 1 || props.info === undefined) {
            return
        }
        if(props.open) {
            countRef.current = 1
        }
        axios.post('https://qnsxbq7cjf.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-getComments', {
            location_id: props.info.id
        })
            .then(res => {
                let apiComments = []
                for(let i = 0; i < res.data.length; i++) {
                    apiComments.push({
                        user_id: res.data[i].from_id,
                        comment: res.data[i].content,
                        date: res.data[i].comment_time,
                        picture: sessionStorage.getItem('picture'),
                    })
                }
                setComments((prevComments) => [...prevComments, ...apiComments]);
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.open, props.info])

    const addComment = () => {
        const newComment = {
            user_id: sessionStorage.getItem('name'),
            comment: comment,
            date: new Date(),
            picture: sessionStorage.getItem('picture'),
        };

        setComments([...comments, newComment]); // 이전 배열의 복사본에 새로운 댓글을 추가한 후 상태를 업데이트합니다.
        document.getElementById('comment_ipt').value = ''
        axios.post('https://8ymn2iwfoj.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-add-comment', {
            location_id: props.info.id,
            from_id: sessionStorage.getItem('name'),
            to_id:props.info.user_id,
            comment: comment
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <>
        {props.info === undefined ? (<></>)
            : (<><div className="cover">
            <div className="main_con">
            <div className="g_header">
            <div className="profile_Name">
            <img className="profile_img" src={sessionStorage.getItem('picture')} onClick={()=>{navigate('/profile')}} alt={'...'}></img>
    <span id="pro_p" onClick={()=>{navigate('/profile')}} >{sessionStorage.getItem('name')}</span>
</div>
</div>
    <div className="gallery">
        <Gslider
            info={props.info}
        />
    </div>
    <div className="g_contents">
        <div className="like_and_location">
            좋아요: {props.info.like_count} / {props.info.name}
        </div>
        <div className="detail">
            <h2>{props.info.title}</h2>
            <hr/>
            {props.info.content}

        </div>
        <div className="date" style={{color:'gray'}}>
            {props.info.updated_at}
        </div>
    </div>
    <hr id="line"></hr>
    <div className="comment">
        <p id="comment_p" style={{lineHeight:'60px'}}>댓글</p>
        <input type="text" id="comment_ipt" onInput={e => {setComment(e.target.value)}}/>
        <button id="comment_btn" onClick={addComment}>게시</button>
    </div>
</div>
    <div className="comment_list">
        <p id="list_p">댓글</p>
        <hr id="list_hr"></hr>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {comments.map(info => (
                <>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="inpic" src={info.picture} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={info.comment}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {info.user_id}
                                    </Typography>
                                    <br/>
                                    {info.date instanceof Date ? info.date.toLocaleString() : info.date}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </>
            ))}
        </List>
    </div>
</div></>)}
        </>


    )
}

export default Gesimool