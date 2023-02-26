import React, { memo, useEffect, useRef, useState } from 'react'
import PlayBarStyle from './index.module.less'
import formatTime from '../../../formatTools/formatTime'
import debounce from '../../../formatTools/debounce'
import { useInterval } from 'ahooks'

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
  const [songInfo, setSongInfo] = useState({})
  const [rate, setRate] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [dotDown, setDotDown] = useState(false)
  const [styles, setStyles] = useState({ width: "0px", height: "0px" })
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState([])


  const audioEl = useRef()
  const preX = useRef(0)
  const newInfos = useRef([])

  const tracks = localStorage.getItem('track-queue')

  useEffect(() => {
    request.get(`/song/detail?ids=${songId}`).then(res => {
      setSongInfo(res.data.songs[0])
    })
  }, [songId])

  useInterval(() => {
    if (isPlaying && !dotDown && songInfo?.dt) {
      // console.log('在播放时', currentTime, audioEl.current.currentTime);
      const rate = Number((audioEl.current.currentTime / (songInfo?.dt / 1000)) * 100)
      setRate(rate.toFixed(2))
      setCurrentTime(audioEl.current.currentTime * 1)
      console.log('时长', songInfo?.dt);
    }
  }, 1000)


  const handlePlay = () => {
    console.log(audioEl);
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
          return currentTime / (songInfo?.dt / 1000)
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
      // if (dotDown) {
      //   audioEl.current.currentTime = currentTime
      // }
    })
  }, [currentTime, dotDown])

  const handleDotMoveTo = (event) => {
    // setLock(true)
    console.log(event);

    const r = (event.nativeEvent.layerX / 420) * 100
    setRate(r * 1)
    setCurrentTime(Number((r / 100) * (songInfo?.dt / 1000)))
    audioEl.current.currentTime = Number((r / 100) * (songInfo?.dt / 1000))


  }

  const handleCatalogueClick = () => {
    setStyles((pre) => {
      if (pre.width === '0px') {
        return { width: '400px', height: '300px' }
      } else {
        return { width: '0px', height: '0px' }
      }
    })
  }

  useEffect(() => {
    if (songInfo && Object.keys(songInfo).length) {
      newInfos.current.push(songInfo)
      let newArr = []
      newInfos.current.forEach(item => {
        if (newArr.findIndex(iten => iten?.id === item.id) < 0) {
          newArr.push(item)
        }
      })
      localStorage.setItem('track-queue', JSON.stringify(newArr))
      console.log(newArr, "-----------");
    }
  }, [songInfo])


  const trackItemClick = (index) => {
    setCurrentIndex(index)
  }

  const cleanAll = () => {
    localStorage.setItem('track-queue', JSON.stringify([]))
  }
  console.log(JSON.parse(tracks));


  return (
    <div className={PlayBarStyle.playBar}>
      <div className={PlayBarStyle.lockBtn}>
        <div></div>
      </div>
      <div className={PlayBarStyle.optinsBar}>
        <audio ref={audioEl}
          src={`https://music.163.com/song/media/outer/url?id=${songId}.mp3`}
          autoPlay
          onLoadedData={e => setIsPlaying(true)}
        ></audio>
        <div className={PlayBarStyle.leftIcons}>
          <img src={prev} />
          <img src={isPlaying
            ? puse : barplay} onClick={handlePlay} />
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
          <img src={catalogue} onClick={handleCatalogueClick} />

        </div>
        <div className={PlayBarStyle.catalogue}
          style={styles}
        >
          <div className={PlayBarStyle.trackHeader}>
            <span onClick={cleanAll}>清除全部</span>
          </div>
          <div className={PlayBarStyle.trackContent}>
            {
              JSON.parse(tracks)?.map((item, index) => {
                return <div className={PlayBarStyle.trackItem}
                  onClick={e => trackItemClick(index)}
                  style={{ backgroundColor: currentIndex === index && "#0f0f0f" }}>
                  <span className={PlayBarStyle.ItemName}>{item.name}</span>
                  <span className={PlayBarStyle.ItemArName}>{item.ar[0].name}</span>
                  <span className={PlayBarStyle.ItemTime}>{formatTime(item.dt)}</span>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div >
  )
})

export default PlayBar