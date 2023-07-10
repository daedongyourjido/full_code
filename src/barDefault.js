
import { Navigate, useNavigate, Link } from 'react-router-dom';
import SearchField from './material/searchField2.js';

export default function Bar() {
    const navigate = useNavigate();

    return (
        <div style={{height:'60px', backgroundColor:'#FFFFFF', fontFamily:'dohyeon', margin:'-20px', display:'flex', flexDirection:'row', justifyContent:'center', boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.1)'}}>
            <h1 style={{paddingBottom:'30px', cursor: 'pointer', width:'200px', color:'#000000', width:'144px', fontSize:'25px'}} onClick={()=>{
                navigate('/');
          }}>대동유어지도</h1>
          <div style={{marginLeft:'60%', display:'flex', flexDirection:'row'}}>
             <SearchField />
             <a href='/login' style={{color:'#045369', fontSize:'15px', marginTop:'17px'}}>Sign In</a>
          </div>
        </div>
    )
}