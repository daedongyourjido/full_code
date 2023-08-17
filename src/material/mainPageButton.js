import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function MainPageButton(props) {
    const navigate = useNavigate();
  
    return (
        <Button variant="outlined" 
        sx={{
          borderColor: props.color,
          color: props.color,
          height: 40
        }}
        onClick={()=>{
          navigate('/');
        }}>메인으로 이동</Button>
    );
  }