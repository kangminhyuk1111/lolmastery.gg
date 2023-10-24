import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {collection, doc, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/firebase";

type setBoardData = {
    title?: string;
    content?: string;
    writer?: string;
    writeDate?: Date;
}
const CommunityDetailPage: React.FC = () => {
    const params:any= useParams()
    useEffect(()=>{
        const fetchBoardData = async () => {
            try{
                const q = query(
                    collection(db, 'notice-board'), where('__name__','==',(params.boardId))
                )
                const querySnapshot = await getDocs(q)
                const data: setBoardData[] = [];
                querySnapshot.forEach((doc)=>(
                    data.push({...doc.data()})
                ))
                console.log(data)
            } catch (err){
                console.error(err)
            }
        }

        fetchBoardData()
    },[])
    return (
        <div className='App'>
            <div className='main-wrapper community'>
                <img className='logo-img' src={`${process.env.PUBLIC_URL}/championImgs/rioticon.png`} alt='alt'/>
                <h1>Community</h1>
                <div className={'community-board-div'}>
                </div>
            </div>
        </div>
    );
}

export default CommunityDetailPage