import React from "react";
import { Navigate } from "react-router";
import AlbumDet from "../pages/details/album-detail/AlbumDet";
import Friend from "../pages/Friend";
import Album from "../pages/Home/Album";
import Artist from "../pages/Home/Artist";
import Home from '../pages/Home/index'
import PlayList from "../pages/Home/PlayList";
import Radio from "../pages/Home/Radio";
import Recommend from "../pages/Home/Recommend";
import TopList from "../pages/Home/TopList";
import MyMusic from "../pages/MyMusic/index";

const routes = [
  {
    path: '/',
    element: <Navigate to='/home' />,
    notShow: true
  },
  {
    path: '/home',
    element: <Home />,
    title: '发现音乐',
    children: [
      {
        path: '/home',
        element: <Navigate to='/home/recommend' />,
        notShow: true
      },
      {
        path: '/home/recommend',
        element: <Recommend />,
        title: '推荐'
      },
      {
        path: '/home/toplist',
        element: <TopList />,
        title: '排行榜'

      },
      {
        path: '/home/playlist',
        element: <PlayList />,
        title: '歌单'

      },
      {
        path: '/home/radio',
        element: <Radio />,
        title: '主播电台'

      },
      {
        path: '/home/artist',
        element: <Artist />,
        title: '歌手'

      },
      {
        path: '/home/album',
        element: <Album />,
        title: '新碟上架'
      },
      {
        path: '/home/detail/:id',
        element: <AlbumDet />,
        // notShow: true
      }
    ]
  },
  {
    path: '/my',
    element: <MyMusic />,
    title: '我的音乐',
  },
  {
    path: '/friend',
    element: <Friend />,
    title: '关注'
  }
]


export default routes