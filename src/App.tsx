import './App.scss';
import Loading from "./component/Loading";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MasteryPage from "./pages/MasteryPage";
import WrongDirectPage from "./pages/WrongDirectPage";
import NoticePage from "./pages/NoticePage";
import CommunityPage from "./pages/CommunityPage";
import ButtonAppBar from "./component/Header";
import React, {useEffect} from "react";

function App() {
    return (
        <>
            <BrowserRouter>
                <ButtonAppBar/>
                <Routes>
                    <Route path="/" element={<MasteryPage />}/>
                    <Route path="/notice/*" element={<NoticePage />}/>
                    <Route path="/community/*" element={<CommunityPage />}/>

                    {/* 404 page */}
                    <Route path="/*" element={<WrongDirectPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}


export default App;
