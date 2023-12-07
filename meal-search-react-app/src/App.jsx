import React, { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function App() {
  const [searchParams, setSearchParams] = useState('');
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(searchParams);
    navigate(`/search?q=${searchParams}`);
  };
  const onInput = (e) => {
    setSearchParams(e.target.value);
  };
  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <NavLink to='/'>MUI</NavLink>
          </Typography>
          <Box component='form' onSubmit={submitHandler}>
            <TextField
              color='secondary'
              value={searchParams}
              onChange={onInput}
              label='Outlined'
              variant='filled'
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingTop: '1rem' }}>
        <Outlet></Outlet>
      </Container>
    </Box>
  );
}

export default App;
