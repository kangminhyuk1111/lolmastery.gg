import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" id="app-bar">
                <Toolbar>
                    <Button component={Link} to={"/community"} color="inherit">커뮤니티</Button>
                    <Button component={Link} to={"/notice"} color="inherit">공지사항</Button>
                    <Button href="https://kangminhyuk1111.tistory.com/" target='_blank' color="inherit">개발자 블로그</Button>
                    <Button component={Link} to={"/"} color="inherit"><i className={"fa-solid fa-magnifying-glass"}></i></Button>
                    <Button component={Link} to={"/community/write"} color="inherit"><i className="fa-solid fa-pencil"></i></Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
