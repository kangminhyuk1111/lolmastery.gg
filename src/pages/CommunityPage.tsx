import React, {useEffect, useState} from 'react';
import {db} from '../firebase/firebase'
import {collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query} from 'firebase/firestore'
import '../css/community.scss'
import Loding from "../component/Loading";
import {Link} from "react-router-dom";
import {timeForToday} from "../calc/timeForToday";
import Loading from "../component/Loading";

// doc.id, doc.data()

type setBoardDataTypes = {
    id:string,
    boardData: {
        title?: string;
        content?: string;
        writer?: string;
        category?: string;
        view?: number;
        writeDate?: { seconds: number | undefined, nanoseconds: number | undefined };
        tags?: [];
    },
    commentData?: {
        commentContent?: string;
        commentWriter?: string;
        commentDate?: string;
    }
}

// firebase db 컬렉션 가져옴
const boardCollectionRef = collection(db, 'community-board')

// create board data
const createFirebaseBoardDb = async () => {
    await addDoc(boardCollectionRef, {title: "hello", content: "hello1"})
}

// update board data
const updateFirebaseBoardDb = async (collectionId: string, data: setBoardDataTypes) => {
    const selectDoc = doc(db, "community-board", collectionId)
    const newBoardData = {title: data.boardData.title, content: data.boardData.content}
    await updateDoc(selectDoc, newBoardData)
}

// delect board data
const deleteFirebaseBoardDb = async (collectionId: string) => {
    const selectDoc = doc(db, "community-board", collectionId)
    await deleteDoc(selectDoc)
}

const CommunityPage: React.FC = () => {
    const [boardData, setBoardData] = useState<any[]>([])

    useEffect(() => {
        // firebase db collection 조회
        const getFirebaseBoardDb = async (): Promise<void> => {
            const boardData = await getDocs(boardCollectionRef);

            let mapData = await Promise.all(boardData.docs.map(async (doc, idx) => {
                const commentDataSnapshot = await getDocs(query(collection(db, `/community-board/${doc.id}/comment`)));
                const comments: object[] = [];
                commentDataSnapshot.forEach((doc) => {
                    comments.push(doc.data());
                });
                return {id: doc.id ,boardData: doc.data(), commentData: comments};
            }));
            setBoardData(mapData)
        }
        getFirebaseBoardDb()
    }, []);

    return (
        <div className='App'>
            <div className='main-wrapper community'>
                <img className='logo-img' src={`${process.env.PUBLIC_URL}/championImgs/rioticon.png`} alt='alt'/>
                <h1>Community</h1>
                <h2>자유롭게 대화하고 의견을 나눠주세요.</h2>
                <div className={'community-board-div'}>
                    {boardData ? boardData.map((item, idx) => {
                        return (
                            <div className='board-item list' key={idx}>
                                <div className='board-item-1'/>
                                <div className='board-item-2'>
                                    <div className={'board-item-2-tags'}>
                                        <span> <img className={'summoner-icon'} src={`${process.env.PUBLIC_URL}/championImgs/rioticon.png`}/> <span className={'span-writer'}>{item.boardData.writer}</span> · {timeForToday(item.boardData.writeDate?.seconds)} · {item.boardData.category} · 조회 {item.boardData.view}</span>
                                    </div>
                                    <Link to={`/community/boardDetail/${item.id}`} className={'board-list'}>
                                        <div className='board-item-2-top'>{item.boardData.title}
                                            <span className='comment-leng'>{item.commentData.length !== 0 ? `[${item.commentData.length}]` : null}</span>
                                        </div>
                                    </Link>
                                    <div className={'board-item-2-middle'}>
                                        <p>{item.boardData.content}</p>

                                    </div>
                                    <div className='board-item-2-bottom'>
                                        {item.boardData.tags ? item.boardData.tags.map((tags:string,idx:number) => {
                                            return <div key={idx} className={'tags'}><div className={'dot'}></div>{tags}</div>
                                        }): null}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : null}
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;