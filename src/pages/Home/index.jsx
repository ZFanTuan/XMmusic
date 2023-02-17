import React, { memo, useState, } from 'react'
import { Outlet, useNavigate } from 'react-router'
import routes from '../../routers'
import Footer from '../Components/footer/Footer'
import HomeStyle from './Home.module.less'



const Home = memo(() => {
  const homeRotes = routes.find(item => {
    return item.path === '/home'
  }).children

  const navigateTo = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(1)

  const handleRouter = (path, index) => {
    navigateTo(path)
    setCurrentIndex(index)
  }
  return (
    <div className={HomeStyle.home}>
      <div className={HomeStyle.header}>
        <div className={HomeStyle.nav}>
          <div className={HomeStyle.content}>
            {
              homeRotes.map((item, index) => {
                if (item.notShow) {
                  return null
                }
                const classN = currentIndex === index ? HomeStyle.text : ''
                // `${currentIndex === index ? HomeStyle.text : ''} test
                return <div className={HomeStyle.title} onClick={e => handleRouter(item.path, index)} key={item.path}>
                  <span className={[`${classN} `, 'test'].join('')}>{item.title}</span>
                </div>
              })
            }
          </div>
        </div>
      </div>
      <Outlet />
      {/* <Footer /> */}
    </div>

  )
})

export default Home