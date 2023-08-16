import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
        <div style={{height:'668px', width:'800px', backgroundColor:'#FFFFFF', display:'grid', gridTemplateColumns: "1fr 3.8fr", gridColumnGap: '1px', boxShadow: '0px 0px 80px rgba(0, 0, 0, 0.2)'}} >
            <div style={{ height: '100%', borderRight: '1px solid #045369', borderRightWidth:'3px', display:'flex', flexDirection:'column', padding:'20px', }}>
                <div style={{color:'gray', fontSize:'15px', marginLeft:'10px'}}>
                    <p className={change} onClick={()=>{navigate('/setting/change')}}>비밀번호 변경</p>
                    <p className={withdraw} onClick={()=>{navigate('/setting/withdraw')}}>회원 탈퇴</p>
                
                </div>

            </div>
            <div>
                <Component />
            </div>

        </div>
    )
}