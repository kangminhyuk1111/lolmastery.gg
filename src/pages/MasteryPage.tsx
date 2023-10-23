import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import {Button, TextField} from "@mui/material";
import Loading from "../component/Loading";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export default function MasteryPage(){
    const [summonerPid, setSummonerPid] = useState<string[]>([]);
    const [summonerName, setSummonerName] = useState();
    const [champKey, setChampKey] = useState();
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [regionArray, setRegionArray] = useState<string[]>(['br1', 'eun1', 'euw1', 'jp1', 'kr', 'la1', 'la2', 'na1', 'oc1', 'tr1', 'ru']);
    const [region, setRegion] = useState<string>('kr')
    const apikey: string | undefined = process.env.REACT_APP_RIOT_API_KEY

    function lowerTen(num:number|string):string|any{
        if(num < 10){
            num = "0" + num
        }
        return num
    }

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
        let minutes: number | string = dateObject.getMinutes();

        month = lowerTen(month)
        day = lowerTen(day)
        hours = lowerTen(hours)
        minutes = lowerTen(minutes)

        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }

    const getSummonerMasteryInfo = (summonerName: string | undefined): void => {
        setLoadingState(true)
        axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apikey}`)
            .then((res: AxiosResponse<any, any>): void => {
                axios.get(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${res.data.puuid}?api_key=${apikey}`)
                    .then((res: AxiosResponse<any, any>) => {
                        setSummonerPid(res.data);
                        setLoadingState(false);
                    })
            })
            .catch((error): void => {
                if (error.response && error.response.status === 404) {
                    alert('존재하지 않는 소환사 입니다.');
                    setLoadingState(false);
                } else {
                    alert('존재하지 않는 소환사 입니다.');
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


    const regionSelectChange = (e: SelectChangeEvent) => {
        setRegion(e.target.value);
    };

    const sortChampList = (condition: string) => {
        switch (condition) {
            case 'playTime':
                break;
            case 'level':
                break;
            case 'chestEarned':
                break;
            default:
                break;
        }
    }

    useEffect((): void => {
        versionChampId();
    }, [])

    return (
        <div className="App">
            <div className='main-wrapper'>
                <img className='logo-img' src={`${process.env.PUBLIC_URL}/championImgs/rioticon.png`} alt='alt'/>
                <h1>LOL Champion Mastery</h1>
                <h2>당신의 리그오브레전드 챔피언 숙련도를 검색하세요</h2>
                <div className='summoner-name'>
                    <FormControl size='small'>
                        <InputLabel id="demo-simple-select-label">Region</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={region}
                            label="Age"
                            onChange={regionSelectChange}
                        >
                            {regionArray ? regionArray.map((item:string,idx:number) => {
                                return <MenuItem value={item} key={idx} >{item.toUpperCase()}</MenuItem>
                            }) : null}
                        </Select>
                    </FormControl>
                    <TextField size='small' className='ml-6' label="소환사이름" variant="outlined" type='text' id='input-summoner'
                               onChange={inputChange}/>
                    <Button variant="contained" className='ml-6' onClick={() => getSummonerMasteryInfo(summonerName)}>검색</Button>
                </div>
            </div>
            <div className='box'>
                {summonerPid ? summonerPid.map((data: any, idx: number) => (
                    <div className='list' key={idx}>
                        <div className='imgBox'>
                            {champKey && champKey[data.championId] && champKey[data.championId]['img'] ? <img
                                className='champImg'
                                src={`${process.env.PUBLIC_URL}/championImgs/${champKey[data.championId]['img']}`}/> : null}
                        </div>
                        <div className='content'>
                            {(idx + 1 > 10) ? null : <h2 className='rank' id='rank_1'><small>#</small>{idx + 1}</h2> }
                            <h4>{champKey && champKey[data.championId] && champKey[data.championId]['names']}</h4>
                            <p>{(() => {
                                return data.championPoints.toLocaleString();
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
    )};