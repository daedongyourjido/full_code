import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export default function SignUpButton(props) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        marginTop: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Dialog open={open}>
          <DialogTitle>대동유어지도</DialogTitle>
          <DialogContent
            className="row-center"
            sx={{ width: "15vw", height: "15vh" }}
          >
            <DialogContentText>
              회원가입 완료! 메일 인증을 완료 해 주세요
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#045369",
            color: "#045369",
            width: "35ch",
          }}
          onClick={() => {
            if (!props.id || !props.pw) props.setEmpty(true);
            else if (props.id && props.pw) props.setEmpty(false);
            if (!props.name || !props.pwDup) props.setEmpty(true);
            else if (props.name && props.pwDup) props.setEmpty(false);
            if (!props.idFix) props.setIdDupChecked(true);
            else if (props.idFix) props.setIdDupChecked(false);
            if (props.pw !== props.pwDup) props.setPwDupCheck(true);
            if (props.id && props.pw) {
              if (props.name && props.pwDup) {
                if (props.pwDup === props.pw) {
                  props.setPwDupCheck(false);
                  setOpen(true);
                  /** 회원가입 api 추가 **/
                  const timeout = 10000;
                  async function fetchData() {
                    try {
                      const res = await axios.post(
                        "https://iclveynbwf.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-signin",
                        {
                          // 로그인 API의 경우 type: 'signup'
                          type: "signup",
                          email: props.id,
                          password: props.pw,
                          nickname: props.name,
                        },
                        { timeout },
                      );
                      console.log(res);
                      navigate("/");
                    } catch (error) {
                      console.log("signup error : ", error);
                      navigate("/");
                    }
                  }

                  fetchData();
                }
              }
            }
          }}
        >
          sign Up
        </Button>
      </Stack>
    </div>
  );
}
