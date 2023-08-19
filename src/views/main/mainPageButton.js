import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function LoginPageButton(props) {
    const navigate = useNavigate();
  
    return (
        <Button variant="outlined" 
        sx={{
          borderColor: props.borderColor,
          color: props.color,
          height: 40
        }}
        onClick={()=>{
          navigate('/login');
        }}>Sign In</Button>
    );
  }