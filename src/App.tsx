import './App.scss';
import Loading from "./component/Loading";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MasteryPage from "./pages/MasteryPage";
import WrongDirectPage from "./pages/WrongDirectPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MasteryPage />}/>
                    <Route path="/main/*" element={<Loading />}/>
                    <Route path="/*" element={<WrongDirectPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}


export default App;
