import React, {useEffect, useState} from 'react';
import { db } from '../firebase/firebase'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import '../css/community.scss'

type setBoardData = {
    title?: string;
    content?: string;
}

// firebase db 컬렉션 가져옴
const boardCollection = collection(db,'notice-board')
// firebase db collection 조회

// create board data
const createFirebaseBoardDb = async () => {
    await addDoc(boardCollection, {title:"hello",content:"hello1"})
}

// update board data
const updateFirebaseBoardDb = async (collectionId:string,title:string,content:string) => {
    const selectDoc = doc(db,"notice-board",collectionId)
    const newBoardData = {title:title,content:content}
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
        const getFirebaseBoardDb = async () => {
            const boardData = await getDocs(boardCollection)
            const mapData = boardData.docs.map((doc) => {
                return doc.data()
            })

            if(typeof mapData === 'object'){
                setBoardData(mapData)
            }

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
                        return(
                            <div className='board-item'>
                                <div className='board-item-title'>{item.title}</div>
                                <div className='board-item-writer'>{item.content}</div>
                            </div>
                        )
                    }) : null}
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;