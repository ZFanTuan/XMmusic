import React, { memo, useEffect, useState } from 'react'
import request from "../../../network/Reuest";

import RecommendStyle from './Recommend.module.less'
import Swiper from './c-components/swiper/Swiper';
import Hot from './c-components/hotrecommend/Hot';
import New from './c-components/newAlbum/New';
import Rankings from './c-components/rankings/Rankings';
import SingerItem from './c-components/singerItem/SingerItem';

const Recommend = memo((props) => {

  const { setSongId } = props
  const [banners, setBanners] = useState([])
  const [hot, setHot] = useState([])
  const [newAlbums, setNewAlbums] = useState([])
  const [ranking, setRanking] = useState([])
  // const [newRanking, setNewRanking] = useState([])
  // const [orgRanking, setOrgRanking] = useState([])
  const [singers, setSingers] = useState([])
  const [djs, setDjs] = useState([])


  useEffect(() => {
    request.get('/banner').then(res => {
      const banners = res.data.banners
      setBanners(banners)
    }).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    request.get('/top/playlist?limit=8&order=hot').then(res => {
      const hot = res.data.playlists
      setHot(hot)
    })
  }, [])

  useEffect(() => {
    request.get('/album/new?limit=40').then(res => {
      const albums = res.data.albums
      setNewAlbums(albums)

    })
  }, [])

  useEffect(() => {
    request.get('/toplist').then(res => {
      const ids = res.data.list.splice(0, 3).map(item => item.id)
      getRankings(ids)
      // for (let item of ids) {
      //   request.get(`/playlist/detail?id=${item.id}`).then(res => {
      //     // setUpRanking(res.data)
      //     results.push(res.data)
      //   })
      // }
      // setRanking(results)
    })
  }, [])

  function getRankings(ids) {
    const requests = []
    ids.forEach(id => {
      requests.push(request.get(`/playlist/detail?id=${id}`))
      // request.all(`/playlist/detail?id=${id}`).then(res => {
      //   // setUpRanking(res.data)
      //   results.push(res.data)
      // })
    });
    Promise.all(requests).then((res) => {
      console.log(res);
      setRanking(res)
    })
  }

  useEffect(() => {
    request.get('/top/artists?offset=0&limit=5').then(res => {
      const singers = res.data.artists
      setSingers(singers)
    })
  }, [])

  useEffect(() => {
    request.get('/dj/toplist/popular?limit=5').then(res => {
      const djs = res.data.data.list
      setDjs(djs)
    })
  }, [])



  return (
    <div className={RecommendStyle.recommend}>
      <Swiper banners={banners} />
      <div className={RecommendStyle.content}>
        <div className={RecommendStyle.songs}>
          <Hot hot={hot} />
          <New albums={newAlbums} />
          <Rankings ranking={ranking} setSongId={setSongId} />
        </div>
        <div className={RecommendStyle.singers}>
          <div className={RecommendStyle.login}>
            <span>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</span>
            <div>用户登录</div>
          </div>
          <div className={RecommendStyle.singer}>
            <div className={RecommendStyle.top}>
              <span>入驻歌手</span>
              <span className={RecommendStyle.more}>更多&gt;</span>
            </div>
            {
              singers?.map(item => {
                return <SingerItem singer={item} />
              })
            }
            <div className={RecommendStyle.aplyBtn}>申请成为网易云音乐人</div>
          </div>
          <div className={RecommendStyle.dj}>
            <div className={RecommendStyle.top}>热门主播</div>
            {
              djs?.map(item => {
                return <div className={RecommendStyle.djItem}>
                  <img src={item.avatarUrl} alt="" title={item.nickName} />
                  <div>{item.nickName}</div>

                </div>
              })
            }
          </div>
        </div>
      </div>

    </div>
  )
})

export default Recommend