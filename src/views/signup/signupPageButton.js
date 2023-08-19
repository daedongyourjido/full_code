import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

export default function SignUpPageButton() {
    const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" 
      sx={{
        borderColor: '#045369',
        color: '#045369',
        width: '25ch',
        height: '5ch'
      }}
      onClick={()=>{
        navigate('/signup');
      }}>Sign up</Button>
    </Stack>
  );
}