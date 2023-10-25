import React, {useEffect, useState} from 'react';
import { db } from '../firebase/firebase'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import '../css/community.scss'
import Loding from "../component/Loading";
import {Link} from "react-router-dom";

// doc.id, doc.data()

type setBoardData = {
    title?: string;
    content?: string;
    writer?: string;
    writeDate?: {seconds:number|undefined,nanoseconds:number|undefined}
    comment?: [];
}

const timeForToday = (value:number|undefined): string|undefined => {
    if(value !== undefined){
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

// firebase db 컬렉션 가져옴
const boardCollectionRef = collection(db,'notice-board')

// create board data
const createFirebaseBoardDb = async () => {
    await addDoc(boardCollectionRef, {title:"hello",content:"hello1"})
}

// update board data
const updateFirebaseBoardDb = async (collectionId:string,data:setBoardData) => {
    const selectDoc = doc(db,"notice-board",collectionId)
    const newBoardData = {title:data.title,content:data.content}
    await updateDoc(selectDoc, newBoardData)
}

// delect board data
const deleteFirebaseBoardDb = async (collectionId:string) => {
    const selectDoc = doc(db,"notice-board",collectionId)
    await deleteDoc(selectDoc)
}

const CommunityPage: React.FC = () => {
    const [boardData, setBoardData] = useState<setBoardData[]>([])

    useEffect(() => {
        // firebase db collection 조회
        const getFirebaseBoardDb = async () => {
            const boardData = await getDocs(boardCollectionRef)

            let mapData = boardData.docs.map((doc) => {
                return doc.data()
            })

            mapData = mapData.sort((a,b) => {
                const aSeconds = a.writeDate?.seconds ?? 0;
                const bSeconds = b.writeDate?.seconds ?? 0;

                return bSeconds- aSeconds;
            })

            if (typeof mapData === 'object'){
                setBoardData(mapData)
            }
        }
        getFirebaseBoardDb()
    }, []);

    // {item.content} {item.comment?.length !== 0 ? item.comment?.length : null}

    return (
        <div className='App'>
            <div className='main-wrapper community'>
                <img className='logo-img' src={`${process.env.PUBLIC_URL}/championImgs/rioticon.png`} alt='alt'/>
                <h1>Community</h1>
                <h2>자유롭게 대화하고 의견을 나눠주세요.</h2>
                <div className={'community-board-div'}>
                    {boardData ? boardData.map((item, idx) => {
                        return(
                            <Link to={`/community/boardDetail/${idx+1}`} className={'board-list'}>
                                <div className='board-item list' key={idx}>
                                    <div className='board-item-1'/>
                                    <div className='board-item-2'>
                                        <div className='board-item-2-top'>아 근데 이부분은 좀..<span className='comment-leng'>[17]</span></div>
                                        <div className='board-item-2-bottom'>
                                            <p className='write-category'>유머</p>
                                            <p className='write-date'>{timeForToday(item.writeDate?.seconds)}</p>
                                            <p className='write-writer'>버거형</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }) : <Loding />}
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;