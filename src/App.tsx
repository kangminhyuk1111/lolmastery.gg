import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.scss';
import MasteryPage from "./pages/MasteryPage";
import NoticePage from "./pages/NoticePage";
import CommunityPage from "./pages/CommunityPage";
import ButtonAppBar from "./component/Header";
import CommunityWritePage from "./pages/CommunityWritePage";
import CommunityDetailPage from "./pages/CommunityDetailPage";
export const timeForToday = (value: number | undefined): string | undefined => {
    if (value !== undefined) {
        const today = new Date();
        const val = value * 1000
        const timeValue = new Date(val);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }
}
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
