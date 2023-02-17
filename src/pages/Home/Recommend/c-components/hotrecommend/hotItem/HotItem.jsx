import React, { memo } from 'react'
import HotItemStyle from './HotItem.module.less'
import play from '../../../../../../icons/play.svg'
import hear from '../../../../../../icons/hear.svg'
import { useNavigate } from 'react-router'

const HotItem = memo((props) => {
  const { item } = props
  const navigate = useNavigate()

  const handleToDetail = (e) => {
    navigate(`/home/detail/${item.id}`)
  }
  return (
    <div>
      <div className={HotItemStyle.listItem} key={item.coverImgUrl}>
        <div className={HotItemStyle.img} onClick={handleToDetail}>
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