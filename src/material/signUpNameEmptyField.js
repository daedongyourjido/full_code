import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SignUpNameEmptyField(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, height: "5.8ch", width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onChange={(e) => {
        props.setName(e.target.value);
      }}
    >
      <div>
        <TextField
          error
          id="outlined-error-helper-text"
          label="닉네임 입력"
          type="password"
          defaultValue=""
          helperText="닉네임을 입력하세요"
        />
      </div>
    </Box>
  );
}
