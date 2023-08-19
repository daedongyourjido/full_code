import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SignUpPwWrongField(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, height: "6.5ch", width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onChange={(e) => {
        props.setPw(e.target.value);
      }}
    >
      <div>
        <TextField
          error
          id="outlined-error-helper-text"
          label="비밀번호는 8자 이상"
          type="password"
          defaultValue=""
          helperText="비밀번호를 입력하세요"
        />
      </div>
    </Box>
  );
}
