import propic from './image/propic.jpg';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import SearchField from './material/searchField2.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Bar() {
    const navigate = useNavigate();

    return (
        <div style={{height:'60px', backgroundColor:'#FFFFFF', fontFamily:'dohyeon', margin:'-20px', display:'flex', flexDirection:'row', justifyContent:'center', boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.1)'}}>
            <ArrowBackIcon fontSize="large" sx={{color:"black", marginTop:"12px", marginLeft:'-50px', marginRight:'50px', cursor:'pointer'}} onClick={() => {
                navigate('/profile');
            }}/>
            <h1 style={{paddingBottom:'30px', cursor: 'pointer', width:'200px', color:'#000000', width:'144px', fontSize:'25px'}} onClick={()=>{
                navigate('/');
          }}>대동유어지도</h1>
          <div style={{marginLeft:'60%', display:'flex', flexDirection:'row'}}>
             <SearchField />
             <img src={propic} style={{width:'40px', height:'40px', borderRadius:'100%', marginLeft:'5px',marginTop:'10px', cursor: 'pointer'}} onClick={()=>{navigate('/setting')}} />
          </div>
        </div>
    )
}