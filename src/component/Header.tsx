import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button href="https://github.com/kangminhyuk1111" target='_blank' color="inherit"><i className="fa-brands fa-github"></i></Button>
                    <Button href="https://kangminhyuk1111.tistory.com/" target='_blank' color="inherit">커뮤니티</Button>
                    <Button href="https://kangminhyuk1111.tistory.com/" target='_blank' color="inherit">공지사항</Button>
                    <Button href="https://kangminhyuk1111.tistory.com/" target='_blank' color="inherit">개발자 블로그</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
