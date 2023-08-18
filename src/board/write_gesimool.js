import React, {useEffect, useState} from 'react';
import './write_gesimool.css'
import '../App.css'
import { useNavigate, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { Button, Input, Paper } from '@mui/material';
import SearchField from "../material/searchField2";
import LoginPageButton from "../material/loginPageButton";
import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSearchParams } from 'react-router-dom';

function BeforeLogin(props){
    const navigate = useNavigate();

    return (
        <div className="bar" style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <SearchField />
            <LoginPageButton onClick={()=>{
                navigate('./login');
            }} />
        </div>
    );
}

function AfterLogin(props){
    const navigate = useNavigate();
    return (
        <div className="bar" style={{display:'flex', flexDirection:'row', justifyContent:'right', margin: 'auto', padding: '10px'}}>
            <SearchField />
            <img src={sessionStorage.picture} style={{width:'40px', height:'40px', borderRadius:'100%', marginRight:'16px', cursor: 'pointer'}} onClick={()=>{navigate('/profile')}}  alt={'...'} />
            <p style={{fontSize:'18px', cursor: 'pointer'}} onClick={()=>{navigate('/profile')}} >{sessionStorage.getItem('name')}</p>
            {/* name 가져와 표시 */}
            <LogoutIcon style={{marginLeft:'15px', cursor:'pointer'}} onClick={()=>{
                sessionStorage.clear();
                window.location.reload();
            }} />
        </div>
    )
}

function Write_gesimool() {

    // 이미지 업로드 객체
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const navigate = useNavigate();
    const location = useLocation()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [login, setLogin] = useState(false);

    const [searchParams] = useSearchParams();
    const queryValue = searchParams.get('locationid') || '';
    useEffect(() => {
        if(queryValue !== '') {
            axios.post('https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO',{
                DML: 'SELECT',
                columns: '*',
                table: 'location',
                where: `id=${queryValue}`
            })
                .then(res => {
                    setPreviewImage(res.data[0].image)
                    setTitle(res.data[0].title)
                    setContent(res.data[0].content)
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [queryValue])

    useEffect(() => { // token 여부에 반응하여 로그인 여부 판단
        const token = sessionStorage.getItem('id');
        if (token) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, []);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setSelectedImage(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = async e => {
        e.preventDefault()
        let selectedImageBase64, fileName
        if(selectedImage === null) {
            selectedImageBase64 = `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`
            fileName = 'sampleImageDamgom.jpeg'
        }
        else {
            selectedImageBase64 = await convertImageToBase64(selectedImage);
            fileName = selectedImage.name
        }
        // Perform upload logic here, e.g. using APIs or other methods
        if(queryValue !== '') {
            /** 게시글 업로드 api 추가 **/
            axios.post('https://r9d6nxucae.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-upload', {
                /**API JSON 형식 참조하여 post 요청을 보내주세요**/
                type: 'post-update',
                fileName: fileName, // 저장할 파일명
                file: JSON.stringify(selectedImageBase64), // 파일 값
                name: location.state.location, // 지역명(seoul, jeju...)-
                id: queryValue,
                title: title, // 게시글 제목
                content: content // 게시글 내용
            })
                // 문제가 없을 경우 이전 페이지(지역 페이지)로 라우팅
                .then(res => {
                    navigate(`/board/${location.state.location}`)
                })
                .catch(error => {
                    console.log(error);
                })
        }
        else {
            /** 게시글 업로드 api 추가 **/
            axios.post('https://r9d6nxucae.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-upload', {
                /**API JSON 형식 참조하여 post 요청을 보내주세요**/
                type: 'post',
                fileName: fileName, // 저장할 파일명
                file: JSON.stringify(selectedImageBase64), // 파일 값
                name: location.state.location, // 지역명(seoul, jeju...)
                user_id: sessionStorage.id, // 사용자 id(test@test.com...)
                title: title, // 게시글 제목
                content: content // 게시글 내용
            })
                // 문제가 없을 경우 이전 페이지(지역 페이지)로 라우팅
                .then(res => {
                    navigate(`/board/${location.state.location}`)
                })
                .catch(error => {
                    console.log(error);
                })
        }

    };

    const convertImageToBase64 = (image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result.split(',')[1]);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(image);
        });
    };
    return (
        <div className="write_cover">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{backgroundColor: '#045369'}}>
                    <Toolbar>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontFamily: "dohyeon" }} onClick={()=>{navigate('/')}}>
                            대동유어지도
                        </Typography>
                        {login? <AfterLogin /> : <BeforeLogin />}
                    </Toolbar>
                </AppBar>
            </Box>
            <div className="write_main">
                <div className="write_con">
                    <div className="top">
                        <h4 style={{margin:'auto', display:'flex'}}>새 게시물</h4>
                        <Button style={{position:'absolute', right:'0%', padding:'18px'}} variant="contained" color="primary" onClick={handleUpload}>
                            업로드
                        </Button>
                    </div>
                    <hr/>

                    <div className={"middle"} >
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {previewImage && (
                            <Paper sx={{height: '100%'}} elevation={3}>
                                <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', height: '100%' }} />
                            </Paper>
                        )}

                    </div>
                    <div className="title" style={{margin: "20px auto auto auto"}}>
                        <p>제목 :</p>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '600px' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField value={title !== '' ? title : () => {}} onChange={(e) => setTitle(e.target.value)} id="standard-basic" variant="standard" style={{margin:'52px 0px 0px 20px'}}/>

                        </Box>
                    </div>
                    <div className="bottom">
                        <CKEditor
                            data={content !== '' ? content : () => {}}
                            editor={ ClassicEditor }
                                config={{placeholder:"내용을 입력해주세요"}}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                                
                            } }
                            onChange={(event, editor) => {
                                setContent(editor.getData())
                                // console.log({ event, editor, content });
                            }}
                            onBlur={ ( event, editor ) => {
                                // console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                // console.log( 'Focus.', editor );
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