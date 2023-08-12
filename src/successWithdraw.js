import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SuccessWithdraw() {
    const navigate = useNavigate();

    return (
        <div>
            <Link to='/' >main</Link>
            <h1>성공적으로 탈퇴되었습니다.</h1>
            <Link to='/' >메인페이지로 이동</Link>
            <button onClick={()=>{
                navigate('/signUp');
            }}>signup</button>
        </div>
    )
}

export default SuccessWithdraw;