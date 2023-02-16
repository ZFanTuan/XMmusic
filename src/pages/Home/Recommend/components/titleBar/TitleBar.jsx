import React, { memo } from 'react'
import TitleBarStyle from './TitleBar.module.less'
const TitleBar = memo((props) => {
  const { title, titles } = props
  return (
    <div>
      <div className={TitleBarStyle.titles}>
        <div className={TitleBarStyle.hotIcon}></div>
        <div className={TitleBarStyle.content}>
          <span className={TitleBarStyle.title}>{title}</span>
          {
            titles?.map((item, index) => {
              return (
                <>
                  <span>{item}</span>
                  <span style={titles.length === index + 1 ? { display: 'none' } : {}}>|</span>
                </>

              )
            })
          }
        </div>
        <div className={TitleBarStyle.more}>
          <span>更多</span>
          <div className={TitleBarStyle.sort}></div>
        </div>
      </div>
    </div>
  )
})

export default TitleBar