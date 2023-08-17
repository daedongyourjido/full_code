import React, {} from 'react';
import { useNavigate} from 'react-router-dom';
import MenuMap from './menuMap.js';
import MainPageButton from './material/mainPageButton.js';


function LoggedOutBar(){
    const navigate = useNavigate();
    return (
        <div className="loggedout-bar">
        <h1 onClick={()=>{ navigate('/') }}>대동유어지도</h1>
        </div>
    );
}

function NeedVerifyBox() {

    return (
        <div className='verify-box' style={{color:'black'}}>
            <p>이메일로 인증 링크를 전송했습니다</p>
            <MainPageButton color="black" />
        </div>
    )
}

function NeedVerify() {
    return (
        <div className="root">
            <div className='bar'>
                <LoggedOutBar />
            </div>

            <MenuMap component={<NeedVerifyBox />} />
        </div>
    )
}



export default NeedVerify;

