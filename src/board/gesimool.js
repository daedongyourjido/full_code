import React from "react";
import './gesimool.css';
import G_slider from "./g_slider";
import {useNavigate} from 'react-router-dom';
import propic from '../image/propic.jpg';

function Gesimool(props) {
    const navigate = useNavigate();

    return(
        <div className="cover">
            <div className="main_con">
                <div className="g_header">
                    <div className="profile_Name">
                        <img className="profile_img" src={propic} onClick={()=>{navigate('/profile')}}></img>
                        <span id="pro_p" onClick={()=>{navigate('/profile')}} >{localStorage.getItem('name')}</span>
                    </div>
                </div>
                <div className="gallery">
                    <G_slider />
                </div>
                <div className="g_contents">
                    <div className="like_and_location">
                        좋아요 / 위치
                    </div>
                    <div className="detail">
                        <p>
                        1. 사이트 차별점
                        - 단순히 정보를 얻는 여행 사이트가 아니라 SNS를 통한 여행 일상 공유 플랫폼을 만들고자 함.
                        - 메인 페이지에 있는 지도에 자신이 다녀온 곳의 정보를 바로 알 수 있도록 지도 위치에 색의 차별을 둠
                        (해당 위치 위에 마우스를 가져다 대면 내가 작성한 리뷰를 프리뷰 형태로 볼 수 있음, 그렇지 않은 장소는 마우스를 가져다 대도 반응이 없도록)
                        <hr/>

                        2. 디자인 구체화
                        - 지도는 남한(+ 제주도)만 표시
                        - 지도가 확대 됐을 때 그 지역에서 쓰여진 랜덤한 리뷰가 지도 옆에 보이도록(ex. ㅇㅇ구 ㅇㅇ공원)
                        - 추천 여행지를 보여줄 때 단순히 태그가 아니라 지역 사진도 같이 보여주면 좋음
                        - 게시물 모음 페이지에서 추천순, 최신순, 인기도순 등으로 정렬기능이 있으면 좋음
                        - 게시물 모음 페이지에서 단순하게 사진만 나열되어져 보이는것이 아니라 별점과 게시물 제목, 게시 날짜도 함께 보이면 좋음
                        - 별점과 태그사용 횟수 등 종합적인 인기도 분별 후 카테고리 마다 해당 지역의 인기 여행지, 숙소, 맛집을 상단에 배치하여 보여주면 좋음
                        - 게시물 페이지 밑에 댓글
                        - 게시물에 좋아요 표시 디자인 필요
                        - 자신이 SNS 게시물 리뷰를 작성한 곳의 지도 색이 진하게 표시되어야 함
                        - 게시물에서 대표 장소의 위치를 보여주는 미니맵이 표시되면 좋을것 같음
                        <hr/>
                        3. 추가 페이지 구상
                        - 회원가입 페이지
                        - 게시물 작성 페이지
                        - 카테고리 이외에 자유롭게 일기나 블로그 포스팅 하듯이 쓰는 자유게시판
                        <hr/>
                        4. 추가적으로 생각해봐야 할 것
                        - 어떤 방식으로 작성한 게시물 리뷰를 카테고리에 맞게 배치할 것인지
                        </p>
                    </div>
                    <div className="date" style={{color:'gray'}}>
                        2023.07.10
                    </div>
                </div>
                <hr id="line"></hr>
                <div className="comment">
                    <p id="comment_p" style={{lineHeight:'60px'}}>댓글</p>
                    <input type="text" id="comment_ipt"></input>
                    <button id="comment_btn">게시</button>
                </div>
            </div>
            <div className="comment_list">
                <p id="list_p">댓글</p>
                <hr id="list_hr"></hr>
                <ul>
                    <li className="comment_li">
                        <img className="commentProfileImg" src={propic} onClick={()=>{navigate('/profile')}}></img>
                        <p className="comments">
                            <span className="commentProfileP" onClick={()=>{navigate('/profile')}} >{localStorage.getItem('name')}</span>
                            댓글
                        </p>
                    </li>
                    <li className="comment_li">
                        <img className="commentProfileImg" src={propic} onClick={()=>{navigate('/profile')}}></img>
                        <p className="comments">
                            <span className="commentProfileP" onClick={()=>{navigate('/profile')}} >{localStorage.getItem('name')}</span>
                            댓글
                        </p>
                    </li>
                    <li className="comment_li">
                        <img className="commentProfileImg" src={propic} onClick={()=>{navigate('/profile')}}></img>
                        <p className="comments">
                            <span className="commentProfileP" onClick={()=>{navigate('/profile')}} >{localStorage.getItem('name')}</span>
                            댓글
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Gesimool