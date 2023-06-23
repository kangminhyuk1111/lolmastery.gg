import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [summonerPid, setSummonerPid] = useState<any[]>([]);
  const [summonerName, setSummonerName] = useState();
  const [championData, setChampionData] = useState<any[]>();
  const [champObjValue, setChampObjValue] = useState({});
  const [champKey, setChampKey] = useState();

  type championsData = {
    [key: string]: any;
    name: string;
  }

  const getSummonerInfo = (summonerName: string | undefined): void => {
    axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`)
      .then((res) => {
        axios.get(`https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${res.data.puuid}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`).then((res) => {
          setSummonerPid(res.data);
          console.log(res);
        })
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
        newObj[keys] = names;
      })
      setChampKey(newObj);
    })
  }

  const downloadImgs = () => {
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
        return (
          <>
            <ul>
              <li>
                {champKey ? champKey[data.championId] : null}
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
