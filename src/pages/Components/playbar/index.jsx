import React, { memo, useEffect, useRef, useState } from 'react'
import PlayBarStyle from './index.module.less'
import formatTime from '../../../formatTools/formatTime'

import prev from '../../../icons/prev.svg'
import next from '../../../icons/next.svg'
import barplay from '../../../icons/barplay.svg'
import puse from '../../../icons/puse.svg'
import PinP from '../../../icons/PinP.svg'
import collect from '../../../icons/collect.svg'
import share from '../../../icons/share.svg'
import volum from '../../../icons/volum.svg'
import repeat from '../../../icons/repeat.svg'
import catalogue from '../../../icons/catalogue.svg'
import request from "../../../network/Reuest";

const PlayBar = memo((props) => {
  const { songId } = props
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({})
  const [rate, setRate] = useState(0)
  const [currentTime,setCurrentTime] = useState(0)
  const audioEl = useRef()
  const timerRef = useRef(null)

  useEffect(() => {
    request.get(`/song/detail?ids=${songId}`).then(res => {
      console.log(res.data.songs[0]);
      setSongInfo(res.data.songs[0])
    })
  }, [songId])

  useEffect(() => {

    if (isPlaying) {
      timerRef.current = setInterval(() => {
        const rate = (audioEl.current.currentTime / (songInfo?.dt / 1000)) * 100
        setCurrentTime(audioEl.current.currentTime)
        setRate(rate.toFixed(2))
        console.log(audioEl.current.currentTime, songInfo?.dt / 1000, rate.toFixed(2));
      }, 1000)
    } else {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [isPlaying])


  const handlePlay = () => {
    // console.log(audioEl.current);
    if (isPlaying) {
      audioEl.current.pause()
    } else {
      audioEl.current.play()
    }

    setIsPlaying(pre => {
      return !pre
    })


  }

  return (
    <div className={PlayBarStyle.playBar}>
      <div className={PlayBarStyle.rightBtn}>
        <div></div>
      </div>
      <div className={PlayBarStyle.optinsBar}>
        <audio ref={audioEl} src={`https://music.163.com/song/media/outer/url?id=${songId}.mp3`}></audio>
        <div className={PlayBarStyle.leftIcons}>
          <img src={prev} />
          <img src={isPlaying ? puse : barplay} onClick={handlePlay} />
          <img src={next} />
        </div>
        <div className={PlayBarStyle.progress}>
          <img src={songInfo?.al?.picUrl} />
          <div className={PlayBarStyle.playInfo}>
            <span>{songInfo?.al?.name}</span>
            <span>{songInfo?.ar?.[0]?.name}</span>
            <div className={PlayBarStyle.wrap}>
              <div className={PlayBarStyle.out}>
                <span className={PlayBarStyle.dot} style={{ left: `calc(${rate}% - 5px)` }}></span>
                <div className={PlayBarStyle.in} style={{ width: `${rate}%` }}></div>
              </div>
              <div className={PlayBarStyle.time}>
                <em>{formatTime(currentTime)}</em>
                <em> / {songInfo ? formatTime(songInfo?.dt) : '00:00'}</em>
              </div>
            </div>
          </div>
        </div>
        <div className={PlayBarStyle.rightIcons}>
          <img src={PinP} />
          <img src={collect} />
          <img src={share} />
          <img src={volum} />
          <img src={repeat} />
          <img src={catalogue} />

        </div>
      </div>
    </div>
  )
})

export default PlayBar