import './App_board.css';
import '../App.css'
import React, { useState, useEffect } from "react";
import { TbBuildingCommunity } from "react-icons/tb";
import { BsPinMap } from "react-icons/bs";
import { MdFoodBank } from "react-icons/md";
import SimpleSlider from './slider';
import ImageCollection from './image_Collection';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import SearchField from "../material/searchField2";
import LoginPageButton from "../material/loginPageButton";
import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function BeforeLogin(){
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
            <Button onClick={()=>{navigate('/write', { state: { location: props.location } })}} variant="contained">게시물 작성하기</Button>
            <SearchField />
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

function Place() {

    const [userLocationInfo, setUserLocationInfo] = useState([])

    const loc = useLocation();
    const paths = loc.pathname.split('/'); // 경로를 '/'로 분할하여 배열로 만듭니다.
    const lastPath = paths[paths.length - 1];

    const navigate = useNavigate();
    const [login, setLogin] = useState(false);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    useEffect(() => { // token 여부에 반응하여 로그인 여부 판단
        const token = sessionStorage.getItem('id');
        if (token) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, []);

    useEffect(()=>{
        axios.post('https://nppy6kx2q6.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-random', {
            user_id: sessionStorage.id,
            place: lastPath
        })
            .then(res => {
                console.log(res.data)
                setUserLocationInfo(res.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, [lastPath])

    return (
        <div className="App">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{backgroundColor: '#045369'}}>
                    <Toolbar>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontFamily: "dohyeon" }} onClick={()=>{navigate('/')}}>
                            대동유어지도
                        </Typography>
                        {login? <AfterLogin location={lastPath} /> : <BeforeLogin />}
                    </Toolbar>
                </AppBar>
            </Box>
            <div className='contents'>
              <div className='side'>
                <div className='inner'>
                  <h1>지역 이름</h1>
                  <h3>추천게시물</h3>
                  <div className='slider'>
                    <SimpleSlider/>
                  </div>
                </div>
                <div className='main'>
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" centered>
                            <Tab icon={<MdFoodBank color={'black'} {...a11yProps(0)} id="icon1" size="50px"/>} />
                            <Tab icon={<TbBuildingCommunity color={'black'} {...a11yProps(1)} id="icon2" size="50px"/>} />
                            <Tab icon={<BsPinMap color={'black'} {...a11yProps(2)} id="icon3" size="50px"/>} />
                        </Tabs>
                        <CustomTabPanel value={value} index={0}>
                            <ImageCollection
                                userLocationInfo={userLocationInfo}
                                lastPath={lastPath}
                            />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <ImageCollection
                                userLocationInfo={userLocationInfo}
                                lastPath={lastPath}
                            />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <ImageCollection
                                userLocationInfo={userLocationInfo}
                                lastPath={lastPath}
                            />
                        </CustomTabPanel>
                    </Box>
                </div>
            </div>
          </div>
        </div>
      );
}

export default Place;
