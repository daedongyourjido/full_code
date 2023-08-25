import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// changePw와 resetPw에서 사용하는 비밀번호 변경 버튼

export default function ChangeButton(props) {
    return (
      <div style={{ display: 'flex', marginTop:'10px', justifyContent: 'center', alignItems: 'center' }} >
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" 
        sx={{
          borderColor: '#045369',
          color: '#045369',
          width: '32ch'
          
        }}
          onClick={()=>{
            if(!props.name)
                props.setEmpty(true);
            else {
                props.setEmpty(false);
                props.setChanged(true);


                // 닉네임 수정 (axios)


            }
        }}>비밀번호 변경</Button>
      </Stack>
      </div>
    );
  }