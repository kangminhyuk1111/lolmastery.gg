import React, {ReactNode, useState} from 'react';
import '../css/contentWrite.scss';
import {Button, TextField} from "@mui/material";
import {addDoc, collection, doc} from "firebase/firestore";
import {db} from "../firebase/firebase";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {TagsInput} from "react-tag-input-component";

interface writeDataInterface {
    title: string,
    writer: string,
    writePassword: string,
    content: string,
    view: number,
    category: '',
    writeDate: number,
}

const CommunityWritePage: React.FC = () => {
    const [writeData, setWriteData] = useState<writeDataInterface>({
        title: '',
        writer: '',
        writePassword: '',
        content: '',
        view: 0,
        category: '',
        writeDate: Date.now(),
    })
    const [tags,setTags] = useState<string[]>([])

    const postWriteData = async (writeData: writeDataInterface) => {
        const {title, writer, writePassword, content, category} = writeData
        const boardCollectionRef = collection(db, 'community-board')
        const currentTimeInMilliseconds = Date.now();
        const currentTimeInNanoseconds = currentTimeInMilliseconds * 1e6; // milliseconds를 나노초로 변환
        const currentTimeInSeconds = Math.floor(currentTimeInMilliseconds / 1000); // milliseconds를 초로 변환
        await addDoc(boardCollectionRef, {
            title: title,
            writer: writer,
            writePassword: writePassword,
            content: content,
            view: 0,
            category: category,
            writeDate: {nanoseconds: currentTimeInNanoseconds, seconds: currentTimeInSeconds},
            tags: tags,
        })
        console.log(writeData)
        alert('게시 완료')
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setWriteData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleTagsChange = (tags:string[]) => {
        if (tags.length <= 3) {
            setTags(tags);
        } else {
            alert('태그는 3개 까지만')
            setTags(tags.slice(0, 3));
        }
    }

    return (
        <div className='content-write'>
            <div className='content-write-page'>
                <h1>글 작성 🔊</h1>
                <FormControl size="small" sx={{minWidth: 120}} id={"mb-6"}>
                    <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="category"
                        label="카테고리"
                        onChange={inputChange as (event: SelectChangeEvent<any>, child: ReactNode) => void}
                    >
                        <MenuItem value={'롤드컵'}>롤드컵</MenuItem>
                        <MenuItem value={'LCK'}>LCK</MenuItem>
                        <MenuItem value={'자유'}>자유</MenuItem>
                        <MenuItem value={'빌드'}>빌드</MenuItem>
                    </Select>
                </FormControl>
                <TagsInput
                    value={tags}
                    onChange={handleTagsChange}
                    name="hashtag"
                    placeHolder="#태그입력"
                />
                <TextField size='small' className='ml-6' label="제목" variant="outlined" type='text' name="title"
                           onChange={inputChange}/>
                <TextField size='small' className='ml-6' label="작성자" variant="outlined" type='text' name="writer"
                           onChange={inputChange}
                           inputProps={{
                               maxLength: 16,
                               pattern: '.{0,16}',
                               title: '최대 16자까지 입력할 수 있습니다.',
                           }}/>
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