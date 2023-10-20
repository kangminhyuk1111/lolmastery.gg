import axios, {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import './App.scss';
import {Button, TextField} from '@mui/material';
import ButtonAppBar from "./component/Header";

function App() {
    const [summonerPid, setSummonerPid] = useState<string[]>([]);
    const [summonerName, setSummonerName] = useState();
    const [champKey, setChampKey] = useState();
    const apikey: string | undefined = process.env.REACT_APP_RIOT_API_KEY

    function convertUnixTimestamp(unixTimestamp:number): string {
        // 밀리초로 변환
        const milliseconds: number = unixTimestamp;

        // 밀리초를 이용하여 Date 객체 생성
        const dateObject: Date = new Date(milliseconds);

        // 년, 월, 일, 시간, 분 추출
        const year:number = dateObject.getFullYear();
        let month:number|string = dateObject.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
        const day:number = dateObject.getDate();
        const hours:number = dateObject.getHours();
        const minutes:number = dateObject.getMinutes();

        if(month < 10){
            month = "0"+month
        }

        // 결과 반환

        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }

    const getSummonerMasteryInfo = (summonerName: string | undefined): void => {
        axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apikey}`)
            .then((res: AxiosResponse<any, any>): void => {
                console.log(res.data.puuid)
                axios.get(`https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${res.data.puuid}?api_key=${apikey}`).then((res) => {
                    setSummonerPid(res.data);
                    console.log(res.data)
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
                newObj[keys] = {names: names, img: data.image.full};
            })
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
            <ButtonAppBar/>
            <div className='main-wrapper'>
                <img className='logo-img' src={`${process.env.PUBLIC_URL}/championImgs/rioticon.png`} alt='alt'/>
                <h1>LOL Champion Mastery</h1>
                <h2>당신의 리그오브레전드 챔피언 숙련도를 검색하세요</h2>
                <div className='summoner-name'>
                    <TextField size='small' label="소환사이름" variant="outlined" type='text' id='input-summoner'
                               onChange={inputChange}/>
                    <Button className='ml-10' variant="contained" onClick={() => getSummonerMasteryInfo(summonerName)}>검색</Button>
                </div>
            </div>
            {/*<div className='wrapper-rank'>*/}
            {/*    <Rank/>*/}
            {/*</div>*/}
            <div className='box'>
                {summonerPid ? summonerPid.map((data: any, idx: number) => (
                    <div className='list'>
                        <div className='imgBox'>
                            {champKey && champKey[data.championId] && champKey[data.championId]['img'] ? <img
                                className='champImg'
                                src={`${process.env.PUBLIC_URL}/championImgs/${champKey[data.championId]['img']}`}/> : null}
                        </div>
                        <div className='content'>
                            <h2 className='rank'><small>#</small>{idx+1}</h2>
                            <h4>{champKey && champKey[data.championId] && champKey[data.championId]['names']}</h4>
                            <p>{(() => {
                                const points = data.championPoints.toLocaleString(); // 콤마 추가
                                return points;
                            })()}</p>
                        </div>
                        <div className='content w-50'>
                            <h4>Lv.{data.championLevel}</h4>
                        </div>
                        <div className='content w-10'>
                            <img
                                className={`chest ${!data.chestGranted ? "notEarned" : "earned"}`}
                                src={`${process.env.PUBLIC_URL}/imgs/chest.png`}/>
                        </div>
                        <div className='content w-50'>
                            <h4>{convertUnixTimestamp(data.lastPlayTime)}</h4>
                        </div>

                    </div>
                )) : null}
            </div>
            {/*<TableContainer component={Paper} id='tb-container'>*/}
            {/*    <Table sx={{minWidth: 650}} aria-label="simple table">*/}
            {/*        <TableHead>*/}
            {/*            <TableRow>*/}
            {/*                <TableCell>챔피언(사진)</TableCell>*/}
            {/*                <TableCell align="right">챔피언(이름)</TableCell>*/}
            {/*                <TableCell align="right">숙련도 레벨</TableCell>*/}
            {/*                <TableCell align="right">숙련도 점수</TableCell>*/}
            {/*                <TableCell align="right">최근 플레이</TableCell>*/}
            {/*                <TableCell align="right">상자 획득 여부</TableCell>*/}
            {/*            </TableRow>*/}
            {/*        </TableHead>*/}
            {/*        <TableBody>*/}
            {/*            {summonerPid ? summonerPid.map((data: any, idx: number) => (*/}
            {/*                <TableRow*/}
            {/*                    key={idx}*/}
            {/*                    sx={{'&:last-child td, &:last-child th': {border: 0}}}*/}
            {/*                >*/}
            {/*                    <TableCell component="th" scope="row">*/}
            {/*                        {champKey && champKey[data.championId] && champKey[data.championId]['img'] ? <img*/}
            {/*                            src={`${process.env.PUBLIC_URL}/championImgs/${champKey[data.championId]['img']}`}/> : null}*/}
            {/*                    </TableCell>*/}
            {/*                    <TableCell*/}
            {/*                        align="right">{champKey && champKey[data.championId] && champKey[data.championId]['names']}</TableCell>*/}
            {/*                    <TableCell align="right">{data.championLevel}</TableCell>*/}
            {/*                    <TableCell align="right">{(() => {*/}
            {/*                        const points = data.championPoints.toLocaleString(); // 콤마 추가*/}
            {/*                        return points;*/}
            {/*                    })()}</TableCell>*/}
            {/*                    <TableCell align="right">{data.protein}</TableCell>*/}
            {/*                    <TableCell align="right">{data.chestGranted ? "가능" : "불가능"}</TableCell>*/}

            {/*                </TableRow>*/}
            {/*            )) : null}*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</TableContainer>*/}
        </div>
    );
}


export default App;
