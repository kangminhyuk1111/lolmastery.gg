import axios, {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import './App.scss';
import {Button, TextField} from '@mui/material';
import ButtonAppBar from "./component/Header";
import Loading from "./component/Loading";



interface RegionList {
    kr: string,
    euw1: string,
    jp1: string,
    eun1: string,
    br1: string,
    la1: string,
    la2: string,
    th2: string,
    th1: string,
}

function App() {
    const [summonerPid, setSummonerPid] = useState<string[]>([]);
    const [summonerName, setSummonerName] = useState();
    const [champKey, setChampKey] = useState();
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [region, setRegion] = useState<RegionList[]>()
    const apikey: string | undefined = process.env.REACT_APP_RIOT_API_KEY

    function convertUnixTimestamp(unixTimestamp: number): string {
        // 밀리초로 변환
        const milliseconds: number = unixTimestamp;

        // 밀리초를 이용하여 Date 객체 생성
        const dateObject: Date = new Date(milliseconds);

        // 년, 월, 일, 시간, 분 추출
        const year: number = dateObject.getFullYear();
        let month: number | string = dateObject.getMonth() + 1;
        let day: number | string = dateObject.getDate();
        let hours: number | string = dateObject.getHours();
        const minutes: number = dateObject.getMinutes();

        if (day < 10){
            day = "0" + day
        }

        if (month < 10) {
            month = "0" + month
        }

        if (hours < 10){
            hours = "0" + hours
        }

        // 결과 반환

        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }

    const getSummonerMasteryInfo = (summonerName: string | undefined): void => {
        setLoadingState(true)
        axios.get(`https://${region ? region : 'kr'}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apikey}`)
            .then((res: AxiosResponse<any, any>): void => {
                console.log(res.data.puuid)
                axios.get(`https://${region ? region : 'kr'}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${res.data.puuid}?api_key=${apikey}`)
                    .then((res: AxiosResponse<any, any>) => {
                        setSummonerPid(res.data);
                        setLoadingState(false);
                    })
            })
            .catch((error): void => {
                if (error.response && error.response.status === 404) {
                    console.error('잘못된 요청입니다.', error)
                    setLoadingState(false);
                } else {
                    alert('존재하지않는 소환사 입니다.');
                    setLoadingState(false);
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
                    <Button variant="contained" onClick={() => getSummonerMasteryInfo(summonerName)}>검색</Button>
                </div>
            </div>
            <div className='box'>
                {summonerPid ? summonerPid.map((data: any, idx: number) => (
                    <div className='list'>
                        <div className='imgBox'>
                            {champKey && champKey[data.championId] && champKey[data.championId]['img'] ? <img
                                className='champImg'
                                src={`${process.env.PUBLIC_URL}/championImgs/${champKey[data.championId]['img']}`}/> : null}
                        </div>
                        <div className='content'>
                            {(idx + 1 > 10) ? null : <h2 className='rank' id='rank_1'><small>#</small>{idx + 1}</h2> }
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
            {loadingState ?
                <div className={`popup-spinner`}><Loading/></div> : null}
        </div>
    );
}


export default App;
