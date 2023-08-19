import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function ChangePwCheckField(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onChange={(e) => {
        props.setPwCheck(e.target.value);
      }}
    >
      <div>
        <TextField
          id="outlined-error-helper-text"
          label="비밀번호 입력"
          defaultValue=""
          type="password"
          helperText="비밀번호를 재확인하세요"
        />
      </div>
    </Box>
  );
}
