import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [summonerPid, setSummonerPid] = useState<any[]>([]);
  const [summonerName, setSummonerName] = useState();
  const [championData, setChampionData] = useState<any[]>();
  const [champKey, setChampKey] = useState();

  const getSummonerInfo = (summonerName: string | undefined): void => {
    axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`)
      .then((res) => {
        axios.get(`https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${res.data.puuid}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`).then((res) => {
          setSummonerPid(res.data);
          console.log(res);
        })
      })
      .catch((err) => {
        if (err) {
          console.log('잘못된 요청입니다.')
        }
      });
  }
  const versionChampId = () => {
    axios.get('https://ddragon.leagueoflegends.com/cdn/13.6.1/data/ko_KR/champion.json').then((res) => {
      setChampionData(res.data.data)
      let champions = Object.values(res.data.data);
      console.log(champions)
      let newObj: any = {};
      champions.map((data: any) => {
        let keys = data.key;
        let names = data.name;
        newObj[keys] = { names: names, imgs: data.image.full };
      })
      setChampKey(newObj);
    })
  }

  const downloadImgs = () => {
    const savePath = `${process.env.PUBLIC_URL}/champImg`;
  }

  const inputChange = (e: any) => {
    setSummonerName(e.target.value);
  }

  useEffect(() => {
    downloadImgs();
    versionChampId();
  }, [])

  return (
    <div className="App">
      <div className='summoner-name'>
        <label>소환사 이름</label>
        <input type='text' id='summonerName' onChange={inputChange} />
        <button onClick={() => getSummonerInfo(summonerName)}>검색</button>
      </div>
      {summonerPid ? summonerPid.map((data: any, idx: any) => {
        console.log(champKey ? champKey[1]['names'] : null)
        return (
          <>
            <ul>
              <li>{champKey ? champKey[data.championId]['imgs'] : null}</li>
              <li>
                {champKey ? champKey[data.championId]['names'] : null}
              </li>
              <li>
                {data.championPoints}
              </li>
            </ul>
          </>
        )
      }) : '!'}
    </div>
  );
}

export default App;
