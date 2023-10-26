import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {collection, doc, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/firebase";
import '../css/communityDetail.scss';
import {timeForToday} from "../calc/timeForToday";
import Loading from '../component/Loading'

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
    const [commentData, setCommentData] = useState<any[]>([])
    const [postData, setPostData] = useState<any>()
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
                   setPostData(doc.data())
                ))
                commentQuerySnapshot.forEach((doc)=>(
                    data.push(doc.data())
                ))
                setCommentData(data)
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
                {postData ? <div className={'community-detail-div'}>
                    <h1>{postData.title}</h1>
                    <div className='detail-sub'>
                        <p>{postData.content}</p>
                        <p className='p-date'>{''}</p>
                        <p className='p-writer'>{postData.writer}</p>
                    </div>
                    <div className='detail-content'>
                        <p>{postData.conetent}</p>
                    </div>
                </div> : null}
                {commentData ? commentData.map((item,idx)=> {
                    return (
                        <div className='detail-comment-div' key={idx}>
                            <p>{item.commentWriter} <span className='detail-comment-div-pl-8'>{timeForToday(item.commentDate?.seconds)}</span></p>
                            <p>{item.commentContent}</p>
                        </div>
                    )
                }) : <Loading />}
            </div>
        </div>
    );
}

export default CommunityDetailPage