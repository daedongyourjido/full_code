import * as React from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchField() {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }} style={{ marginTop: "5px" }}>
      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </Box>
  );
}
