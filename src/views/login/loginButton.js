import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

export default function LoginButton(props) {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: "#045369",
        color: "#045369",
        width: "35ch",
      }}
      onClick={async () => {
        if (!props.id || !props.pw) props.setEmpty(true);
        else {
          props.setEmpty(false);

          /** 로그인 api 추가 **/
          const res = await axios.post(
            "https://h8viqjk6ob.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-login",
            {
              id: props.id,
              password: props.pw,
            },
          );
          let statusCode = 0;
          if (localStorage.getItem(`${props.id}`) === null)
            statusCode = res.status;

          switch (statusCode) {
            case 0:
              alert("아이디 혹은 패스워드 오류");
              break;

            // 계정 정보 존재하는 경우 status 201
            case 201:
              // 사용자 정보 인증 안 됨
              if (res.data.verified === 0) {
                alert("이메일 인증을 완료해주세요!");
              }
              // 사용자 정보 인증됨
              else {
                sessionStorage.setItem("id", res.data.id);
                sessionStorage.setItem("pw", res.data.password);
                sessionStorage.setItem("name", res.data.nickname);
                sessionStorage.setItem("picture", res.data.picture);
                sessionStorage.setItem("_key", res.data.key);
                navigate("/");
              }
              break;
            // 계정 정보 맞지 않은 경우 status 202
            case 202:
              alert("아이디 혹은 패스워드 오류");
              break;
            default:
              break;
          }
        }
      }}
    >
      sign In
    </Button>
  );
}
