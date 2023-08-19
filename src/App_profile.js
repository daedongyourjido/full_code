import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import React, {useEffect, useRef, useState} from "react";
import FollowingModal from './followingModal.js';
import FollowerModal from './followerModal.js';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchField from "./material/searchField";
import LoginPageButton from "./material/loginPageButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {MdFoodBank} from "react-icons/md";
import {TbBuildingCommunity} from "react-icons/tb";
import ImageCollection from "./board/image_Collection";
import { Avatar, Button, Grid, Paper, Typography } from '@mui/material';
import { Settings, People, PersonAdd } from '@mui/icons-material';
import Modal from "react-modal";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import ListComponent from "./board/list_Component";
function BeforeLogin(){
  const navigate = useNavigate();

  return (
      <div className="bar" style={{display:'flex', flexDirection:'row', justifyContent:'right', margin: 'auto', padding: '10px'}}>
        <SearchField />
        <LoginPageButton onClick={()=>{
          navigate('./login');
        }} />
      </div>
  );
}
function AfterLogin(props){

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [searchLocationResult, setSearchLocationResult] = useState([])
  const customOverlayStyle = {
    overlay: {

      zIndex: 9999, // 모달을 최상위 레이어에 표시
    }
  };
  const openModal = (info) => {


      axios.post('https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO',{
          DML: 'SELECT',
          columns: '*',
          table: 'user',
          where: `username like '%${searchText}%' or email like '%${searchText}%' or nickname like '%${searchText}%'`
      })
          .then(res => {
              setSearchResult(res.data)
              axios.post('https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO',{
                  DML: 'SELECT',
                  columns: '*',
                  table: 'location',
                  where: `name like '%${searchText}%' or title like '%${searchText}%' or content like '%${searchText}%'`
              })
                  .then(res => {
                      setSearchLocationResult(res.data)
                      setIsModalOpen(true);
                  })
                  .catch(err => {
                      console.log(err)
                  })
          })
          .catch(err => {
              console.log(err)
          })

  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };
    const handleFollow = (targetId: number)  => {
        axios.post('https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO',{
            DML: 'INSERT',
            table: 'following',
            columns: 'follower_id, following_id',
            values: `${sessionStorage._key}, ${targetId}`
        })
            .then(res => {
                console.log(res)
            })
            .then(err => {
                console.log(err)
            })
    }
  return (
      <div className="bar" style={{display:'flex', flexDirection:'row', justifyContent:'right', margin: 'auto', padding: '10px'}}>
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="검색"
              inputProps={{ 'aria-label': 'search google maps' }}
              onInput={e => {setSearchText(e.target.value)}}
          />
          <IconButton onClick={openModal} type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="modal-content"
            overlayClassName="modal-overlay"
            style={customOverlayStyle} // 오버레이 스타일을 적용
        >
          <Box sx={{ width: '100vw', height: '60vh', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography variant="h6" gutterBottom>
              사용자 검색 결과
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {searchResult.map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <ListItem
                        key={value}
                        secondaryAction={
                          <IconButton
                            onClick={() => { handleFollow(value.id) }}
                              edge="end" aria-label="comments">
                            <PersonAdd />
                          </IconButton>
                        }
                        disablePadding
                    >
                        <Avatar src={value.picture}/>
                      <ListItemText id={labelId} primary={`${value.nickname}`} />
                        <ListItemText id={labelId} primary={`${value.email}`} />
                    </ListItem>
                );
              })}
            </List>
            <Typography variant="h6" gutterBottom>
              게시물 검색 결과
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {searchLocationResult.map((info, index) => {

                return (
                    <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton edge="end" aria-label="comments">
                            <CommentIcon />
                          </IconButton>
                        }
                        disablePadding
                    >
                        <ListComponent
                            id={info.id}
                            img={info.image}
                            alt={info.id}
                            like_count={info.like_count}
                            name={info.name}
                            star_count={info.star_count}
                            title={info.title}
                        />
                    </ListItem>
                );
              })}
            </List>
            <Button onClick={closeModal} variant="contained">
              닫기
            </Button>
          </Box>
        </Modal>
        <img src={sessionStorage.picture} style={{width:'40px', height:'40px', borderRadius:'100%', marginRight:'16px', cursor: 'pointer'}} onClick={()=>{navigate('/profile')}}  alt={'...'}/>
        <p style={{fontSize:'18px', cursor: 'pointer'}} onClick={()=>{navigate('/profile')}} >{sessionStorage.getItem('name')}</p>
        {/* name 가져와 표시 */}
        <LogoutIcon style={{marginLeft:'15px', cursor:'pointer'}} onClick={()=>{
          sessionStorage.clear();
          window.location.reload();
        }} />
      </div>
  )
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

export default function AppProfile() {
  const navigate = useNavigate();
  /** 코드 통합 이후 사용자 정보 세선 저장하는 방식 추가 **/
  const [login, setLogin] = useState(false);
    // eslint-disable-next-line no-unused-vars
  const [userLocationInfo, setUserLocationInfo] = useState([])
    const [userLocationInfoDataDesc, setUserLocationInfoDataDesc] = useState([])
    const [userLocationInfoLikeDesc, setUserLocationInfoLikeDesc] = useState([])
    // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0);
  const [follower, setFollower] = useState([])
  const [following, setFollowing] = useState([])
    // eslint-disable-next-line no-unused-vars
  const [userImage, setUserImage] = useState(sessionStorage.picture)

  /** 사용자 장소 이미지 불러오는 api **/
  useEffect(()=>{
      axios.post('https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO',{
          DML: 'SELECT',
          columns: '*',
          table: 'location',
          where: `user_id='${sessionStorage.id}' ORDER BY created_at desc`
      })
          .then(res => {
              setUserLocationInfoDataDesc(res.data)
          })
          .catch(error => {
              console.log(error);
          })
      axios.post('https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO',{
          DML: 'SELECT',
          columns: '*',
          table: 'location',
          where: `user_id='${sessionStorage.id}' ORDER BY like_count desc`
      })
          .then(res => {
              setUserLocationInfoLikeDesc(res.data)
          })
          .catch(error => {
              console.log(error);
          })
    axios.post('https://nppy6kx2q6.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-random', {
      type: 'profile',
      user_id: sessionStorage.id
    })
        .then(res => {
          setUserLocationInfo(res.data)
        })
        .catch(error => {
          console.log(error);
        })
  }, [])
  useEffect(() => { // token 여부에 반응하여 로그인 여부 판단
    const token = sessionStorage.getItem('id');
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  useEffect(() => {
    // get my following
    axios.post('https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO', {
      DML: 'SELECT',
      columns: '*',
      table: 'user',
      where: `id in(SELECT following_id FROM following, user WHERE following.follower_id = ${sessionStorage._key} and user.id = ${sessionStorage._key})`
    })
        .then(res => {
          setFollowing(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    // get follower
    axios.post('https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO', {
      DML: 'SELECT',
      columns: '*',
      table: 'user',
      where: `id in(SELECT follower_id FROM following, user WHERE following.following_id = ${sessionStorage._key} and user.id = ${sessionStorage._key})`
    })
        .then(res => {
          setFollower(res.data)
          console.log('my follower', res)
        })
        .catch(err => {
          console.log(err)
        })
  }, [])
  useEffect(() => {
    setUserImage(sessionStorage.picture)
  }, [])

    const [uploadedImage, setUploadedImage] = useState(null);
    const avatarInputRef = useRef(null);

    const handleAvatarClick = () => {
        // Trigger the hidden file input when Avatar is clicked
        avatarInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                setUploadedImage(file);

                // Convert the uploaded image to Base64
                const base64Image = reader.result.split(',')[1];

                try {
                    // Send the Base64-encoded image to the server
                    await axios.post('https://r9d6nxucae.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-upload', {
                        /**API JSON 형식 참조하여 post 요청을 보내주세요**/
                        type: 'user',
                        fileName: file.name, // 저장할 파일명
                        file: JSON.stringify(base64Image), // 파일 값
                        email :sessionStorage.id
                    })
                    sessionStorage.setItem('picture', `https://2023-c-capstone.s3.us-east-2.amazonaws.com/info/${sessionStorage.id}/${file.name}`)
                    // Handle the server response if needed
                } catch (error) {
                    console.error('Error submitting image:', error);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    console.log(sessionStorage.picture)
    return (
          <div>
              <div id="wrap">
                  <div className='header'>
                      <Box sx={{ flexGrow: 1 }} className='header'>
                          <AppBar position="static" sx={{backgroundColor: '#045369'}}>
                              <Toolbar>
                                  <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontFamily: "dohyeon" }} onClick={()=>{navigate('/')}}>
                                      대동유어지도
                                  </Typography>
                                  {login ? <AfterLogin location={'/'} /> : <BeforeLogin />}
                              </Toolbar>
                          </AppBar>
                      </Box>
                  </div>
                  <Box sx={{ display: 'inline-flex', flexDirection: 'row', justifyContent: 'space-between' }} id={'main'} style={{paddingTop:'5rem'}}>
                      <Box sx={{ display: 'inline-flex', flexDirection: 'column', width: '50vw', height: '100vh' }} id={'left'}>
                          <Paper elevation={3} style={{ padding: '20px', width: '90%', height: '80%', margin: 'auto' }}>
                              <Box sx={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', width: '100%', margin: 'auto' }}>
                                  <div>
                                      <Avatar
                                          alt="User Avatar"
                                          src={uploadedImage ? URL.createObjectURL(uploadedImage) : sessionStorage.picture}
                                          sx={{ width: '240px', height: '240px', margin: '0 auto', cursor: 'pointer' }}
                                          onClick={handleAvatarClick}
                                      />
                                      <input
                                          type="file"
                                          accept="image/*"
                                          ref={avatarInputRef}
                                          style={{ display: 'none' }}
                                          onChange={handleImageChange}
                                      />
                                  </div>
                                  <Typography variant="h5" gutterBottom style={{textAlign: 'center'}}>
                                      {sessionStorage.id}
                                  </Typography>
                              </Box>
                              <Box>
                                  <Grid container justifyContent="space-between" alignItems="center">
                                      <Grid item>
                                          <Button
                                              variant="outlined"
                                              startIcon={<People />}
                                          >
                                              <FollowerModal
                                                  follower={follower}
                                              />
                                              팔로워 {follower.length}
                                          </Button>
                                      </Grid>
                                      <Grid item>
                                          <Button
                                              variant="outlined"
                                              startIcon={<PersonAdd />}
                                          >
                                              <FollowingModal
                                                  following={following}
                                              />
                                              팔로잉 {following.length}
                                          </Button>
                                      </Grid>
                                  </Grid>
                              </Box>
                              <Button
                                  variant="contained"
                                  startIcon={<Settings />}
                                  style={{ marginTop: '20px' }}
                                  onClick={() => {
                                      navigate('/setting/change');
                                  }}
                              >
                                  설정
                              </Button>
                          </Paper>
                      </Box>
                      <Box id={'right'} sx={{ display: 'inline-flex', flexDirection: 'column', width: '50vw', height: '100vh' }}>
                          <Box className={'right'} sx={{ width: '100%', height: '80%', margin:'auto' }}>
                              <Tabs sx={{ display: 'inline-flex', flexDirection: 'row', justifyContent: 'space-between' }} style={{width: '100%'}} value={value} aria-label="icon label tabs example" centered>
                                  <Tab icon={<MdFoodBank color={'black'} {...a11yProps(0)} id="icon1" size="70px"/>}
                                       iconPosition='start' label="최신순"/>
                                  <Tab icon={<TbBuildingCommunity color={'black'} {...a11yProps(1)} id="icon2" size="50px"/>}
                                       iconPosition='start' label="추천순"/>
                              </Tabs>
                              <CustomTabPanel value={value} index={0} style={{overflow:'auto', maxHeight: '100vh'}}>
                                  {userLocationInfoDataDesc.length === 0 ? '' : <ImageCollection
                                      userLocationInfo={userLocationInfoDataDesc}
                                  />}

                              </CustomTabPanel>
                              <CustomTabPanel value={value} index={1} style={{overflow:'auto', maxHeight: '100vh'}}>
                                  {userLocationInfoLikeDesc.length === 0 ? '' : <ImageCollection
                                      userLocationInfo={userLocationInfoLikeDesc}
                                  />}
                              </CustomTabPanel>
                          </Box>
                      </Box>
                  </Box>
              </div>
          </div>

      )
}
