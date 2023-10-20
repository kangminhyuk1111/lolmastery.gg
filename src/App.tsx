import axios, {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import './App.scss';
import Loading from "./component/Loading";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MasteryPage from "./pages/MasteryPage";

interface RegionList {
    kr: string,
    euw1: string,
    jp1: string,
    eun1: string,
    br1: string,
    la1: string,
    la2: string,
    th2: string,
    th1: string,
}

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MasteryPage />}/>
                    <Route path="/main/*" element={<Loading />}/>
                    <Route path="/*" element={<Loading/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}


export default App;
