import React, { memo, useEffect } from 'react'
import RankingStyle from './Ranking.module.less'

const Ranking = memo((props) => {
  const { ranking } = props
  useEffect(() => {
    console.log(ranking);
  }, [ranking])

  return (
    <div className={RankingStyle.ranking}>
      <div className={RankingStyle.top}>
        <div className={RankingStyle.img} title={ranking?.playlist?.name}>
          <img src={ranking?.playlist?.coverImgUrl} alt="" />
          <div className={RankingStyle.mask}></div>
        </div>
        <div className={RankingStyle.text}>
          <div className={RankingStyle.name} title={ranking?.playlist?.name}>{ranking?.playlist?.name}</div>
          <div className={RankingStyle.btn}>
            <span className={RankingStyle.play}></span>
            <span className={RankingStyle.collect}></span>
          </div>
        </div>
      </div>
      <div className={RankingStyle.songs}>
        {
          ranking?.playlist?.tracks.splice(0, 10).map((item, index) => {
            return <div className={RankingStyle.song}
              style={index % 2 == 0 ? { backgroundColor: '#e8e8e8', } : {}}>
              <div className={RankingStyle.index}>{index + 1}</div>
              <div className={RankingStyle.name} title={item.name}>{item.name}</div>
              <div className={RankingStyle.btn}>
                <div className={RankingStyle.play}></div>
                <div className={RankingStyle.add}></div>
                <div className={RankingStyle.collect}></div>
              </div>
            </div>
          })
        }
      </div>
      <div className={RankingStyle.more}>查看全部&gt;</div>
    </div>
  )
})

export default Ranking