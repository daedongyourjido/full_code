import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FindPwField(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onChange={(e) => {
        props.setPw(e.target.value);
      }}
    >
      <div>
        <TextField
          id="outlined-password-input"
          label="이메일"
          autoComplete="current-password"
        />
      </div>
    </Box>
  );
}
