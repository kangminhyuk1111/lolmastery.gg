import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {collection, doc, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/firebase";

type setBoardDataTypes = {
    boardData : {
        title?: string;
        content?: string;
        writer?: string;
        category?: string;
        writeDate?: { seconds: number | undefined, nanoseconds: number | undefined }
    },
    commentData? : {
        commentContent?:string;
        commentWriter?:string;
        commentDate?:string;
    }
}
const CommunityDetailPage: React.FC = () => {
    // TODO state넣어서 커뮤니티 페이지 작성하기
    const params:any= useParams()
    useEffect(()=>{
        const fetchBoardData = async () => {
            try{
                const contentQuery = query(
                    collection(db, 'notice-board'), where('__name__','==',params.boardId)
                )
                const commentQuery = query(collection(db,`/notice-board/${params.boardId}/comment`))
                const contentQuerySnapshot = await getDocs(contentQuery)
                const commentQuerySnapshot = await getDocs(commentQuery)
                const data: any[] = [];
                contentQuerySnapshot.forEach((doc)=>(
                    console.log(doc.data())
                ))
                commentQuerySnapshot.forEach((doc)=>(
                    console.log(doc.data())
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