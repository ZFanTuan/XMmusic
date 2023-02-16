import React, { memo , useRef } from 'react'
import AlbumListStyle from './AlbumList.module.less'
import { Carousel } from 'antd'
import AlbumItem from './albumItem/AlbumItem'

const AlbumList = memo((props) => {
  const {albums} =props
  const carouselEl = useRef(null)
  return (
    <div>
       <div className={AlbumListStyle.albums}>
          <div className={AlbumListStyle.leftIcon} onClick={e => carouselEl.current.prev()}></div>
          <Carousel className={AlbumListStyle.Carousel} dots={false} ref={carouselEl}>
            {
              albums.map((item, index) => {
                return <div className={AlbumListStyle.list} key={index}>
                  {
                    item.map((item, index) => {
                      return <AlbumItem album={item}  key={item.blurPicUrl}/>
                    })
                  }
                </div>
              })
            }
          </Carousel>
          <div className={AlbumListStyle.rightIcon} onClick={e => carouselEl.current.next()}></div>
        </div>
    </div>
  )
})

export default AlbumList