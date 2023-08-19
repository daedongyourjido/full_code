import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function ChangePwOldField(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onChange={(e) => {
        props.setOldPw(e.target.value);
      }}
    >
      <div>
        <TextField
          id="outlined-password-input"
          label="기존 비밀번호"
          type="password"
          autoComplete="current-password"
        />
      </div>
    </Box>
  );
}
