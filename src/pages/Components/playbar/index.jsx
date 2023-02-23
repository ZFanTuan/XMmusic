import React, { memo, useEffect, useRef, useState } from 'react'
import PlayBarStyle from './index.module.less'
import formatTime from '../../../formatTools/formatTime'
import debounce from '../../../formatTools/debounce'

import defaultImg from '../../../pictures/default_album.png'
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
  const [currentTime, setCurrentTime] = useState(0)
  const [dotDown, setDotDown] = useState(false)
  const [lock, setLock] = useState(false)

  const audioEl = useRef()
  const timerRef = useRef(null)
  const preX = useRef(0)

  useEffect(() => {
    request.get(`/song/detail?ids=${songId}`).then(res => {
      setSongInfo(res.data.songs[0])
    })
  }, [songId])

  useEffect(() => {
    if (isPlaying && !dotDown) {
      timerRef.current = setInterval(() => {
        console.log('在播放时', currentTime, audioEl.current.currentTime);

        const rate = Number((audioEl.current.currentTime / (songInfo?.dt / 1000)) * 100)
        setCurrentTime(audioEl.current.currentTime)
        setRate(rate.toFixed(2))
        // console.log(audioEl.current.currentTime, songInfo?.dt / 1000, rate.toFixed(2));
      }, 1000)
    } else {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [isPlaying, dotDown])


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
  const handleDotDown = (e) => {
    setDotDown(true)
    preX.current = e.clientX
  }
  const handleDotMove = (event) => {
    if (dotDown) {
      const moveX = event.clientX - preX.current
      preX.current = event.clientX
      console.log(event.clientX, preX.current);
      setRate(pre => {
        if (pre > 99.5 && moveX > 0) {
          return 100
        } else if (pre < 0 && moveX < 0) {
          return 0
        }
        return Number((pre * 1) + (moveX / 420) * 100)
      })
      console.log(rate, "rate");
      setCurrentTime(Number((rate / 100) * (songInfo?.dt / 1000)))
    }
  }
  useEffect(() => {
    window.addEventListener("mouseup", (event) => {
      // setLock(true)
      audioEl.current.currentTime = currentTime
      setDotDown(false)
      if (dotDown) {
        audioEl.current.currentTime = currentTime
      }
    })
  }, [currentTime, dotDown])


  const handleDotMoveTo = (event) => {
    // setLock(true)
    console.log(event);

    const r = Number((event.nativeEvent.layerX / 420) * 100)
    setRate(r)
    setCurrentTime(Number((r / 100) * (songInfo?.dt / 1000)))
    audioEl.current.currentTime = Number((r / 100) * (songInfo?.dt / 1000))


  }

  useEffect(() => {
    console.log('外部', rate, Number(parseFloat(currentTime)).toFixed(2));
  }, [rate])

  return (
    <div className={PlayBarStyle.playBar}>
      <div className={PlayBarStyle.rightBtn}>
        <div></div>
      </div>
      <div className={PlayBarStyle.optinsBar}>
        <audio ref={audioEl}
          src={`https://music.163.com/song/media/outer/url?id=${songId}.mp3`}
        ></audio>
        <div className={PlayBarStyle.leftIcons}>
          <img src={prev} />
          <img src={isPlaying ? puse : barplay} onClick={handlePlay} />
          <img src={next} />
        </div>
        <div className={PlayBarStyle.progress}>
          <img src={songId ? songInfo?.al?.picUrl : defaultImg} />
          <div className={PlayBarStyle.playInfo}
            onMouseMove={handleDotMove}
          >
            <span>{songInfo?.al?.name}</span>
            <span>{songInfo?.ar?.[0]?.name}</span>
            <div className={PlayBarStyle.wrap}>
              <div className={PlayBarStyle.out}
                onClick={handleDotMoveTo}
                onMouseMove={handleDotMove}
              >
                <span className={PlayBarStyle.dot}
                  style={{ marginLeft: `calc(${rate}% - 5px)` }}
                  onMouseDown={handleDotDown}
                ></span>
                <div className={PlayBarStyle.in}
                  style={{ width: `${rate}%` }}

                ></div>
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
    </div >
  )
})

export default PlayBar