import React from "react";
import './write_gesimool.css'
import { useNavigate, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";

function Write_gesimool() {

    const navigate = useNavigate();
    const location = useLocation()
    function Text() {
        return (
            <p style={{cursor: 'pointer'}} onClick={()=>{
              navigate('/');
            }}>대동유어지도</p>
        )
    }

    const onSubmit = e => {
        e.preventDefault()
        /** 게시글 업로드 api 추가 **/
        axios.post('https://r9d6nxucae.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-upload', {
            /**API JSON 형식 참조하여 post 요청을 보내주세요**/
            //fileName: filename, => 저장할 파일명
            //file: file, => 파일 값
            //name: name, => 지역명(seoul, jeju...)
            //user_id: user_id, => 사용자 id(test@test.com...)
            //title: title, => 게시글 제목
            //content: content => 게시글 내용

        })
            // 문제가 없을 경우 이전 페이지(지역 페이지)로 라우팅
            .then(res => {
                navigate(location.state?.from || '/')
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="write_cover">
            <div className='header'>
                <Text />
                <div className='r_header'>
                    <input type='text'></input>
                    <a href='/'>Login</a>
                </div>
            </div>
            <div className="write_main">
                <div className="write_con">
                    <div className="top">
                        <h4 style={{margin:'auto', display:'flex'}}>새 게시물</h4>
                        <a style={{position:'absolute', right:'0%', padding:'19.5px'}} onClick={onSubmit}>업로드</a>
                    </div>
                    <hr/>
                    <div className="middle">
                        <a className="picture" href="/">  
                            <p id="picture_p">사진 첨부</p>  
                        </a>
                    </div>
                    <div className="title">
                        <p id="title_p">제목 :</p>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '600px' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField id="standard-basic" variant="standard" style={{marginTop:'34px'}}/>
                        </Box>
                    </div>
                    <div className="bottom">
                        <CKEditor 
                            editor={ ClassicEditor }
                                config={{placeholder:"내용을 입력해주세요"}}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                                
                            } }
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({ event, editor, data });
                            }}
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                    </div>
                </div>
                <div className="write_map">
                    지도
                </div>
            </div>
        </div>
    )
}

export default Write_gesimool