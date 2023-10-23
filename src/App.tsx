import './App.scss';
import Loading from "./component/Loading";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MasteryPage from "./pages/MasteryPage";
import WrongDirectPage from "./pages/WrongDirectPage";
import NoticePage from "./pages/NoticePage";
import CommunityPage from "./pages/CommunityPage";
import ButtonAppBar from "./component/Header";
import React, {useEffect} from "react";
import { db } from './firebase/firebase'
import { collection, getDocs, getDoc ,doc } from 'firebase/firestore'

function App() {
    const boardCollection = collection(db, "notice-board")

    useEffect(() => {
        async function getBoardData() {
            const getData = await getDocs(boardCollection)
        }
        getBoardData()
    },[])

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
