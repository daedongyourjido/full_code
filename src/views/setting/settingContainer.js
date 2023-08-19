import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './setting.css';

export default function SettingContainer(props) {
    const navigate = useNavigate();
    const Component = props.component;
    const [change, setChange] = useState("");
    const [withdraw, setWithdraw] = useState("");
    
    useEffect(() => {
        if(props.menu === "changePw") {
            setChange("setting_container_in");
            setWithdraw("setting_container_out");
        }   
        else {
            setChange("setting_container_out");
            setWithdraw("setting_container_in");
        }
    }, [props.menu]);


    return (
        <div className='setting-box' >
            <div className='setting-menu-container'>
                <div style={{color:'gray', fontSize:'15px', marginLeft:'10px'}}>
                    <p className={`${change} setting-change`} onClick={()=>{navigate('/setting/change')}}>비밀번호 변경</p>
                    <p className={`${withdraw} setting-withdraw`} style={{whiteSpace:'nowrap'}} onClick={()=>{navigate('/setting/withdraw')}}>회원 탈퇴</p>
                
                </div>

            </div>
            <div>
                <Component />
            </div>

        </div>
    )
}