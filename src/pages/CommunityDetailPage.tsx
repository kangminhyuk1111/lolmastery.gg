import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {collection, doc, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/firebase";
import '../css/communityDetail.scss';

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
                <div className={'community-detail-div'}>
                    <h1>this is test title</h1>
                    <div className='detail-sub'>
                        <p>category</p>
                        <p className='p-date'>date</p>
                        <p className='p-writer'>writer</p>
                    </div>
                    <div className='detail-content'>
                        <p>안녕 내이름은 강민혁이고
                        오늘부터 잘부탁한다
                        너희가 나를 잘 챙겨 줄거라고 생각해</p>
                    </div>
                </div>
                <div className='detail-comment-div'>
                    <p>야가다 강씨 <span className='detail-comment-div-pl-8'>date</span></p>
                    <p>이건좀 ㅋㅋ;</p>
                </div>
            </div>
        </div>
    );
}

export default CommunityDetailPage