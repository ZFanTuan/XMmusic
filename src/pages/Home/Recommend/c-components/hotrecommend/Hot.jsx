import React, { memo, useEffect } from 'react'
import TitleBar from '../../components/titleBar/TitleBar';
import HotStyle from './Hot.module.less'
import HotItem from './hotItem/HotItem';



const Hot = memo((props) => {
  const hotList = props.hot
  const titles = ['华语', '流行', '摇滚', '民谣', '电子']
  return (
    <div>
      <div className={HotStyle.hot}>
        <TitleBar title='热门推荐' titles={titles} ></TitleBar>
        <div className={HotStyle.list}>
          {
            hotList.map((item, index) => {
              return (
                <HotItem item={item} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
})

export default Hot