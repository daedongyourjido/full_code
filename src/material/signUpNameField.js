import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SignUpNameField(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onChange={(e) => {
        props.setName(e.target.value);
      }}
    >
      <div>
        <TextField
          id="outlined-helperText"
          label="닉네임"
          defaultValue=""
          helperText=""
        />
      </div>
    </Box>
  );
}
