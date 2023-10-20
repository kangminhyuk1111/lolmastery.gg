import React from 'react';
import {Oval} from "react-loader-spinner";

export default function Loding(){
    return <Oval height={80}
                 width={80}
                 color="#4fa94d"
                 wrapperStyle={{}}
                 wrapperClass=""
                 visible={true}
                 ariaLabel='oval-loading'
                 secondaryColor="#4fa94d"
                 strokeWidth={2}
                 strokeWidthSecondary={2}/>
};

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