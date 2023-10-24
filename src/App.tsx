import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.scss';
import MasteryPage from "./pages/MasteryPage";
import WrongDirectPage from "./pages/WrongDirectPage";
import NoticePage from "./pages/NoticePage";
import CommunityPage from "./pages/CommunityPage";
import ButtonAppBar from "./component/Header";
import CommunityWritePage from "./pages/CommunityWritePage";
import CommunityDetailPage from "./pages/CommunityDetailPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <ButtonAppBar/>
                <Routes>
                    <Route path="/" element={<MasteryPage />}/>
                    <Route path="/notice/*" element={<NoticePage />}/>
                    <Route path="/community/" element={<CommunityPage />}/>
                    <Route path="/community/write" element={<CommunityWritePage />}/>
                    <Route path='/community/boardDetail/:boardId' element={<CommunityDetailPage />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}


export default App;
