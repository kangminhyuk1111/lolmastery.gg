import React, {useState} from 'react';
import '../css/contentWrite.scss';
import {Button, TextField} from "@mui/material";
import Textarea from '@mui/material'
import {addDoc, collection, doc} from "firebase/firestore";
import {db} from "../firebase/firebase";
import { Navigate } from 'react-router-dom';

interface writeDataInterface {
    title: string,
    writer: string,
    writePassword: string,
    content: string,
}

const CommunityWritePage: React.FC = () => {
    const [writeData, setWriteData] = useState<writeDataInterface>({
        title: '',
        writer: '',
        writePassword: '',
        content: '',
    })

    const postWriteData = async (writeData: writeDataInterface) => {
        const {title, writer, writePassword, content} = writeData
        const boardCollectionRef = collection(db, 'notice-board')
        await addDoc(boardCollectionRef, {title:title, writer:writer, writePassword:writePassword, content:content})
        alert('게시 완료')
        window.location.href = '/community'
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setWriteData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className='content-write'>
            <div className='content-write-page'>
                <h1>글 작성</h1>
                <TextField size='small' className='ml-6 category' label="카테고리" variant="outlined" type='text' name="category"
                           onChange={inputChange}/>
                <TextField size='small' className='ml-6' label="제목" variant="outlined" type='text' name="title"
                           onChange={inputChange}/>
                <TextField size='small' className='ml-6' label="작성자" variant="outlined" type='text' name="writer"
                           onChange={inputChange}/>
                <TextField size='small' className='ml-6' label="비밀번호" variant="outlined" type='password'
                           name="writePassword"
                           onChange={inputChange}/>
                <TextField
                    className='ml-6'
                    placeholder="글 작성"
                    multiline
                    rows={16}
                    name="content"
                    onChange={inputChange}
                />
                <div className={"write-btn-div"}>
                    <Button
                        onClick={() => postWriteData(writeData)}
                        id={"write-btn"} variant="contained" className='ml-6'>게시</Button>
                </div>
            </div>
        </div>
    );
}

export default CommunityWritePage