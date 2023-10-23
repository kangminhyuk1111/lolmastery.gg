import React from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Button, TextField} from "@mui/material";

const CommunityPage: React.FC = () => {
    return (
        <div className='App'>
            <div className='main-wrapper community'>
                <img className='logo-img' src={`${process.env.PUBLIC_URL}/championImgs/rioticon.png`} alt='alt'/>
                <h1>LOL Champion Mastery</h1>
                <h2>당신의 리그오브레전드 챔피언 숙련도를 검색하세요</h2>
            </div>
        </div>
    );
}

export default CommunityPage;