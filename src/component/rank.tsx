import React from 'react';
import '../css/rank.scss'

export default function Rank() {
    return (
        <div className='rank-division'>
            <div className='rank-2'>
                <img src={`${process.env.PUBLIC_URL}/championImgs/Annie.png`} />
                <p className='rank-champInfo2'>22222</p>
                <div className='rank-text'>
                    <p>2</p>
                </div>
            </div>
            <div className='rank-1'>
                <img src={`${process.env.PUBLIC_URL}/championImgs/Annie.png`} />
                <p className='rank-champInfo1'>22222</p>
                <div className='rank-text'>
                    <p>1</p>
                </div>
            </div>
            <div className='rank-3'>
                <img src={`${process.env.PUBLIC_URL}/championImgs/Annie.png`} />
                <p className='rank-champInfo3'>22222</p>
                <div className='rank-text'>
                    <p>3</p>
                </div>
            </div>
        </div>
    );
}