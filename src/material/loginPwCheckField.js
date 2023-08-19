import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function LoginPwCheckField(props) {
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
          id="outlined-helperText"
          label="비밀번호 재확인"
          type="password"
          defaultValue=""
          helperText=""
        />
      </div>
    </Box>
  );
}
