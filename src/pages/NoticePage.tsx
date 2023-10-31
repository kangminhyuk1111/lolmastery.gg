import React, {useEffect, useState} from 'react';
import {timeForToday} from "../calc/timeForToday";
import {Link} from "react-router-dom";
import {db} from '../firebase/firebase'
import {collection, getDocs} from 'firebase/firestore'
import {useQuery, UseQueryOptions, UseQueryResult} from "@tanstack/react-query";
import Loading from '../component/Loading';

type noticeBoardType = {
    id: string;
    boardData: {
        title: string;
        content: string;
        tags?: [];
        view: 0;
        category?: string;
        writeDate?: { seconds: number | undefined, nanoseconds: number | undefined };
        writer?: string;
    }
}
// firebase db 컬렉션 가져옴
const boardCollectionRef = collection(db, 'notice-board')

async function getNoticeDb(): Promise<noticeBoardType[]> {
    const boardData = await getDocs(boardCollectionRef);
    let data = boardData.docs.map((doc) => ({
        id: doc.id, boardData: doc.data() as noticeBoardType['boardData']
    }));
    return data;
};

export default function NoticePage() {
    const queryOptions: UseQueryOptions<noticeBoardType[], Error> = {
        queryKey: ['noticeData'], // 쿼리 키를 여기에 지정
        queryFn: getNoticeDb, // 비동기 함수를 여기에 지정
    };
    const query: UseQueryResult<noticeBoardType[], Error> = useQuery(queryOptions);
    const {data, isLoading, isError} = query;


    return (
        <div className={"App"}>
            <div className='main-wrapper community'>
                <img className='logo-img' src={`${process.env.PUBLIC_URL}/championImgs/rioticon.png`} alt='alt'/>
                <h1>Notice</h1>
                <h2>공지사항 및 업데이트 사항</h2>
                <div className={'community-board-div'}>
                    {isLoading ? <Loading/> : null}
                    {isError ? <span>error..!</span> : null}
                    {data ? data.map((item: any, idx: number) => (
                        <div className='board-item list' key={idx}>
                            <div className='board-item-1'/>
                            <div className='board-item-2'>
                                <div className={'board-item-2-tags'}>
                                <span> <img className={'summoner-icon'}
                                            src={`${process.env.PUBLIC_URL}/championImgs/rioticon.png`}/> <span
                                    className={'span-writer'}>{item.boardData.writer}</span> · {timeForToday(item.boardData.writeDate?.seconds)} · {item.boardData.category} · 조회 {item.boardData.view}</span>
                                </div>
                                <Link to={`/notice/boardDetail/${item.id}`} className={'board-list'}>
                                    <div className='board-item-2-top'>{item.boardData.title}</div>
                                </Link>
                                <div className={'board-item-2-middle'}>
                                    <p className={'p-10-content'}>{item.boardData.content}</p>
                                </div>
                                <div className='board-item-2-bottom'>
                                    {item.boardData.tags ? item.boardData.tags.map((tags: string, idx: number) => {
                                        return <div key={idx} className={'tags'}>
                                            <div className={'dot'}></div>
                                            {tags}</div>
                                    }) : null}
                                </div>
                            </div>
                        </div>)) : null}
                </div>
            </div>
        </div>

    );
}