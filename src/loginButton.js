import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function LoginButton(props) {
    const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
      <Button variant="outlined" 
      sx={{
        borderColor: '#045369',
        color: '#045369',
        width: '35ch'
        
      }}
        onClick={()=>{
          if(!props.id || !props.pw)
            props.setEmpty(true);
          else {
            props.setEmpty(false);

                /** 로그인 api 추가 **/
                axios.post('https://h8viqjk6ob.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-login', {
                    id: props.id,
                    password: props.pw
                })
                .then(res => {
                    const statusCode = res.status
                    switch (statusCode) {
                        // 계정 정보 존재하는 경우 status 201
                        case 201:
                            // 사용자 정보 인증 안 됨
                            if(res.data.verified === 0) {
                                alert('이메일 인증을 완료해주세요!')
                            }
                            // 사용자 정보 인증됨
                            else {
                                sessionStorage.setItem('id', res.data.id);
                                sessionStorage.setItem('pw', res.data.password);
                                sessionStorage.setItem('name', res.data.nickname);
                                sessionStorage.setItem('picture', res.data.picture);
                                navigate('/');
                            }
                            break
                        // 계정 정보 맞지 않은 경우 status 202
                        case 202:
                            alert('아이디 혹은 패스워드 오류')
                            break
                        default:
                            break
                    }
                })
                .catch(error => {
                    console.log(error);
                })

      }}}>sign In</Button>
    </div>
  );
}