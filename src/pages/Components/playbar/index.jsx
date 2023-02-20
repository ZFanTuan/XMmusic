import React, { memo } from 'react'
import PlayBarStyle from './index.module.less'

import prev from '../../../icons/prev.svg'
import next from '../../../icons/next.svg'
import barplay from '../../../icons/barplay.svg'
import PinP from '../../../icons/PinP.svg'
import collect from '../../../icons/collect.svg'
import share from '../../../icons/share.svg'
import volum from '../../../icons/volum.svg'
import repeat from '../../../icons/repeat.svg'
import catalogue from '../../../icons/catalogue.svg'

const PlayBar = memo(() => {
  return (
    <div className={PlayBarStyle.playBar}>
      <div className={PlayBarStyle.rightBtn}>
        <div></div>
      </div>
      <div className={PlayBarStyle.optinsBar}>
        <audio src=""></audio>
        <div className={PlayBarStyle.leftIcons}>
          <img src={prev} />
          <img src={barplay} />
          <img src={next} />
        </div>
        <div className={PlayBarStyle.progress}>
          <img src="https://p2.music.126.net/zAgRwbhwdU_xhASpLXRuyA==/109951168307007939.jpg?param=34y34" />
          <div className={PlayBarStyle.playInfo}>
            <span>name</span>
            <span>artname</span>
            <div className={PlayBarStyle.wrap}>
              <div className={PlayBarStyle.out}>
                <span className={PlayBarStyle.dot}></span>
                <div className={PlayBarStyle.in}></div>
              </div>
              <div>
                <em>时间</em>
                <em> / 时间</em>
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