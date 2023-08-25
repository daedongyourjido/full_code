import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './setting.css';

export default function SettingContainer(props) {
    const navigate = useNavigate();
    const Component = props.component;
    const [changeuserinfo, setChangeuserinfo] = useState("");
    const [change, setChange] = useState("");
    const [withdraw, setWithdraw] = useState("");
    
    useEffect(() => {
        if(props.menu === "changePw") {
            setChange("setting_container_in");
            setWithdraw("setting_container_out");
            setChangeuserinfo("setting_container_out");
        }   
        else if(props.menu === "withdraw") {
            setChange("setting_container_out");
            setWithdraw("setting_container_in");
            setChangeuserinfo("setting_container_out");
        }
        else {
            setChangeuserinfo("setting_container_in");
            setChange("setting_container_out");
            setWithdraw("setting_container_out");
        }
    }, [props.menu]);


    return (
        <div className='setting-box' >
            <div className='setting-menu-container'>
                <div style={{color:'gray', fontSize:'15px', marginLeft:'10px'}}>
                    <p className={`${changeuserinfo} setting-change-user-info`} 
                        onClick={() =>
                            {navigate('/setting/change-user-info')}}>프로필 수정</p>
                    <p className={`${change} setting-change`} 
                        onClick={() =>
                            {navigate('/setting/change')}}>비밀번호 변경</p>
                    <p className={`${withdraw} setting-withdraw`} 
                        style={{whiteSpace:'nowrap'}} 
                        onClick={()=>{navigate('/setting/withdraw')}}>회원 탈퇴</p>
                
                </div>

            </div>
            <div>
                <Component />
            </div>

        </div>
    )
}