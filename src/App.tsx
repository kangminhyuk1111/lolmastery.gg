import axios, {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import './App.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, TextField} from '@mui/material';


function App() {
    const [summonerPid, setSummonerPid] = useState<string[]>([]);
    const [summonerName, setSummonerName] = useState();
    const [champKey, setChampKey] = useState();
    const apikey: string | undefined = process.env.REACT_APP_RIOT_API_KEY

    const getSummonerInfo = (summonerName: string | undefined): void => {
        axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apikey}`)
            .then((res: AxiosResponse<any, any>): void => {
                axios.get(`https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${res.data.puuid}?api_key=${apikey}`).then((res) => {
                    setSummonerPid(res.data);
                })
            })
            .catch((err): void => {
                if (err) {
                    console.log('잘못된 요청입니다.')
                }
            });
    }
    const versionChampId = () => {
        axios.get('https://ddragon.leagueoflegends.com/cdn/13.6.1/data/ko_KR/champion.json').then((res) => {
            let champions: any[] = Object.values(res.data.data);
            let newObj: any = {};
            champions.map((data: any): void => {
                let keys = data.key;
                let names = data.name;
                console.log(keys + " : " + names)
                newObj[keys] = {names: names, img: data.image.full};
            })
            console.log(newObj)
            setChampKey(newObj);
        })
    }

    const inputChange = (e: any): void => {
        setSummonerName(e.target.value);
    }

    useEffect((): void => {
        versionChampId();
    }, [])

    return (
        <div className="App">
            <div className='main-wrapper'>
                <img src={`${process.env.PUBLIC_URL}/championImgs/rioticon.png`}/>
                <h1>LOL Champion Mastery</h1>
                <h2>당신의 리그오브레전드 챔피언 숙련도를 검색하세요</h2>
                <div className='summoner-name'>
                    <TextField label="소환사이름" variant="outlined" type='text' id='summonerName' onChange={inputChange}/>
                    <Button variant="contained" onClick={() => getSummonerInfo(summonerName)}>검색</Button>
                </div>
            </div>
            <TableContainer component={Paper} id='tb-container'>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>챔피언(사진)</TableCell>
                            <TableCell align="right">챔피언(이름)</TableCell>
                            <TableCell align="right">숙련도 레벨</TableCell>
                            <TableCell align="right">숙련도 점수</TableCell>
                            <TableCell align="right">최근 플레이</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {summonerPid ? summonerPid.map((data: any, idx: number) => (
                            <TableRow
                                key={idx}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {champKey && champKey[data.championId] && champKey[data.championId]['img'] ? <img
                                        src={`${process.env.PUBLIC_URL}/championImgs/${champKey[data.championId]['img']}`}/> : null}
                                </TableCell>
                                <TableCell align="right">{champKey && champKey[data.championId] && champKey[data.championId]['names']}</TableCell>
                                <TableCell align="right">{data.championLevel}</TableCell>
                                <TableCell align="right">{(() => {
                                    const points = data.championPoints.toLocaleString(); // 콤마 추가
                                    return points;
                                })()}</TableCell>
                                <TableCell align="right">{data.protein}</TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}


export default App;
