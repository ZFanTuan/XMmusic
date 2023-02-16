import React, { memo } from 'react'
import HotItemStyle from './HotItem.module.less'
import play from '../../../../../../icons/play.svg'
import hear from '../../../../../../icons/hear.svg'

const HotItem = memo((props) => {
  const { item } = props
  return (
    <div>
      <div className={HotItemStyle.listItem} key={item.coverImgUrl}>
        <div className={HotItemStyle.img}>
          <img src={item.coverImgUrl} alt="111" title={item.name} />
        </div>
        <div className={HotItemStyle.count}>
          <div>
            <img src={hear} alt="" />
          </div>
          <span>{item.playCount}</span>
          <div><img src={play} alt="" title='播放' /></div>
        </div>
        <div className={HotItemStyle.desc}>
          <span>{item.name}</span>
        </div>
      </div>
    </div>
  )
})

export default HotItem