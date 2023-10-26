import React, {useState} from 'react';
import '../css/contentWrite.scss';
import {Button, TextField} from "@mui/material";
import Textarea from '@mui/material'

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

    const postWriteData = (writeData:writeDataInterface) => {
        const { title, writer, writePassword, content } = writeData
        console.log(title, writer, writePassword, content)
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWriteData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className='content-write'>
            <div className='content-write-page'>
                <h1>글 작성</h1>
                <TextField size='small' className='ml-6' label="제목" variant="outlined" type='text' name="title"
                onChange={inputChange}/>
                <TextField size='small' className='ml-6' label="작성자" variant="outlined" type='text' name="writer"
                           onChange={inputChange}/>
                <TextField size='small' className='ml-6' label="비밀번호" variant="outlined" type='password' name="writePassword"
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