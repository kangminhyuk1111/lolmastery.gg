import axios, {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import './App.scss';
import Loading from "./component/Loading";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MasteryPage from "./pages/MasteryPage";

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
