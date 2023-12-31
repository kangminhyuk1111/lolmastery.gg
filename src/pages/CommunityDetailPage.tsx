import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/firebase";
import '../css/communityDetail.scss';
import {timeForToday} from "../calc/timeForToday";
import Loading from '../component/Loading'
import {deleteFirebaseBoardDb} from "../calc/deleteFirbaseDbFun";

type setBoardDataTypes = {
    boardData: {
        title?: string;
        content?: string;
        writer?: string;
        category?: string;
        writeDate?: { seconds: number | undefined, nanoseconds: number | undefined }
    },
    commentData?: {
        commentContent?: string;
        commentWriter?: string;
        commentDate?: string;
    }
}

const handleDelete = async (collectionId: any) => {
    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (shouldDelete) {
        const selectDoc = doc(db, "community-board", collectionId)
        await deleteDoc(selectDoc)
        alert("삭제 완료.")
        window.location.href = '/community'
    }
}

const CommunityDetailPage: React.FC = () => {
    const [commentData, setCommentData] = useState<any[]>([])
    const [postData, setPostData] = useState<any>()
    const params: any = useParams()
    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const contentQuery = query(
                    collection(db, 'community-board'), where('__name__', '==', params.boardId)
                )
                const commentQuery = query(collection(db, `/community-board/${params.boardId}/comment`))
                const contentQuerySnapshot = await getDocs(contentQuery)
                const commentQuerySnapshot = await getDocs(commentQuery)
                const data: any[] = [];
                contentQuerySnapshot.forEach((doc) => (
                    setPostData(doc.data())
                ))
                commentQuerySnapshot.forEach((doc) => (
                    data.push(doc.data())
                ))
                setCommentData(data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchBoardData()
    }, [])
    return (
        <div className='App'>
            <div className='main-wrapper community'>
                <img className='logo-img' src={`${process.env.PUBLIC_URL}/championImgs/rioticon.png`} alt='alt'/>
                <h1>Community</h1>
                {postData ? <div className={'community-detail-div'}>
                    <div className={'board-item-2-bottom detail-tag-list'}>
                        <div className={'d-flex-left'}>
                            {postData.tags ? postData.tags.map((data: any, idx: number) => {
                                return <div key={idx} className={'tags'}>
                                    <div className={'dot'}></div>
                                    {data}</div>
                            }) : null}
                        </div>
                        <div className={'d-flex-right'}>
                            <span onClick={() => {
                            }}>수정</span>
                            <span onClick={()=>handleDelete(params.boardId)}>삭제</span>
                        </div>

                    </div>
                    <h1 className={"ft-w-500"}>{postData.title}</h1>
                    <div className='detail-sub'>
                        <p className='p-date'>{timeForToday(postData.writeDate.seconds)}</p>
                        <p className='p-writer'>{postData.writer}</p>
                    </div>
                    <div className='detail-content'>
                        <p style={{whiteSpace: "pre-line"}} className={'p-10-content'}>{postData.content}</p>
                    </div>
                </div> : null}
                {commentData ? commentData.map((item, idx) => {
                    return (
                        <div className='detail-comment-div' key={idx}>
                            <p>{item.commentWriter} <span
                                className='detail-comment-div-pl-8'>{timeForToday(item.commentDate?.seconds)}</span></p>
                            <p>{item.commentContent}</p>
                        </div>
                    )
                }) : <Loading/>}
            </div>
        </div>
    );
}

export default CommunityDetailPage