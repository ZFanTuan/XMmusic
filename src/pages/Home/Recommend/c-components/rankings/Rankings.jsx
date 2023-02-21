import React, { memo, useEffect, useState } from 'react'
import TitleBar from '../../components/titleBar/TitleBar'
import RankingsStyle from './Rankings.module.less'
import Ranking from './ranking/Ranking'


const Rankings = memo((props) => {
  const { ranking,setSongId } = props

  return (
    <div>
      <div className={RankingsStyle.rankings}>
        <TitleBar title='榜单' />
        <div className={RankingsStyle.all}>
          {
            ranking?.map(item => {
              return <Ranking ranking={item.data} setSongId={setSongId} />
            })
          }
        </div>
      </div>
    </div>
  )
})

export default Rankings