import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SignUpIdDupErrorField(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          m: 1,
          width: "25ch",
          height: "6.5ch",
          backgroundColor: "white",
        },
      }}
      noValidate
      autoComplete="off"
      onChange={(e) => {
        props.setId(e.target.value);
      }}
    >
      <div>
        <TextField
          error
          id="outlined-error-helper-text"
          label="중복된 이메일입니다"
          defaultValue=""
          helperText="이메일을 입력하세요"
        />
      </div>
    </Box>
  );
}
