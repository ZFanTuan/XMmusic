import React, { memo } from 'react'
import SingerItemStyle from './SingerItem.module.less'

const SingerItem = memo((props) => {
  const { singer } = props
  return (
    <div className={SingerItemStyle.sinItem}>

      <img className={SingerItemStyle.img} title={singer.name} src={singer.img1v1Url} />
      <div className={SingerItemStyle.text}>
        <div className={SingerItemStyle.singerName}>{singer.name}</div>
        <div className={SingerItemStyle.albums}>专辑数量：{singer.albumSize}</div>
        <div className={SingerItemStyle.funs}>粉丝数：{singer.fansCount}</div>
      </div>
    </div>
  )
})

export default SingerItem