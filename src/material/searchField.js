import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import {useState} from "react";

export default function SearchField(props) {
    const [searchText, setSearchText] = useState('')
    const handleSearch = (e) => {
        e.preventDefault()
        props.handleOpen()
    }
  return (
      <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
          <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="검색"
              inputProps={{ 'aria-label': 'search google maps' }}
              onInput={e => {setSearchText(e.target.value)}}
          />
          <IconButton onClick={handleSearch} type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
          </IconButton>
      </Paper>
  );
}