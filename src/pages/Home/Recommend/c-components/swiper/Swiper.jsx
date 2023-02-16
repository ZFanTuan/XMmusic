import React, { memo, useRef } from 'react'
import SwiperStyle from './Swiper.module.less'
import { Button, Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const Swiper = memo((props) => {
  const carouselEl = useRef()

  const { banners } = props
  return (
    <div>

      <div className={SwiperStyle.tabBar}>
        <div className={SwiperStyle.Cleft}>
          <Button className={SwiperStyle.left}
            icon={<LeftOutlined style={{ fontSize: '30px' }} />}
            onClick={() => carouselEl.current.prev()}
          ></Button>
        </div>
        <div className={SwiperStyle.carousel}>
          <Carousel autoplay ref={carouselEl}>
            {
              banners.map((item, index) => {
                return (
                  <div className={SwiperStyle.banners} key={item.encodeId}>
                    <img src={item.imageUrl} />
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <div className={SwiperStyle.download}>
          <a href='https://music.163.com/#/download'></a>
        </div>
        <div className={SwiperStyle.Cright}>
          <Button className={SwiperStyle.right}
            icon={<RightOutlined style={{ fontSize: '30px' }} />}
            onClick={() => carouselEl.current.next()}
          ></Button>
        </div>
      </div>
    </div>
  )
})

export default Swiper