import React, { memo, useEffect, useState } from 'react'
import TitleBar from '../../components/titleBar/TitleBar'
import RankingsStyle from './Rankings.module.less'
import Ranking from './ranking/Ranking'


const Rankings = memo((props) => {
  const { upRanking, newRanking, orgRanking } = props



  return (
    <div>
      <div className={RankingsStyle.rankings}>
        <TitleBar title='榜单' />
        <div className={RankingsStyle.all}>
          <Ranking ranking={upRanking} />
          <Ranking ranking={newRanking} />
          <Ranking ranking={orgRanking} />
        </div>
      </div>
    </div>
  )
})

export default Rankings