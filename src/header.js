import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
      return (
          <h1 style={{paddingBottom:'30px', cursor: 'pointer', width:'200px'}} onClick={()=>{
            navigate('/');
          }}>대동유어지도</h1>
      )
  }