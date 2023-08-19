import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function ChangePwOldErrorField(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, height: "6.5ch", width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onChange={(e) => {
        props.setOldPw(e.target.value);
      }}
    >
      <div>
        {props.oldPwEmpty ? (
          <TextField
            error
            id="outlined-error-helper-text"
            label="비밀번호 입력"
            type="password"
            defaultValue=""
            helperText="비밀번호를 입력하세요"
          />
        ) : (
          <TextField
            error
            id="outlined-error-helper-text"
            label="비밀번호"
            type="password"
            defaultValue=""
            helperText="비밀번호가 일치하지 않습니다"
          />
        )}
      </div>
    </Box>
  );
}
