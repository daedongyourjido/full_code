import React from "react";
import './write_gesimool.css'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 

function Write_gesimool() {

    const navigate = useNavigate();

    function Text() {
        return (
            <p style={{cursor: 'pointer'}} onClick={()=>{
              navigate('/');
            }}>대동유어지도</p>
        )
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
                        <a style={{position:'absolute', right:'0%', padding:'19.5px'}} href="/">업로드</a>
                    </div>
                    <hr/>
                    <div className="middle">
                        <a className="picture" href="/">  
                            <p>사진 첨부</p>  
                        </a>
                    </div>
                    <div className="title">
                        <p>제목 :</p>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '600px' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField id="standard-basic" variant="standard" style={{marginTop:'35px'}}/>
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