import React, { memo} from 'react'
import NewStyle from './New.module.less'
import TilteBar from '../../components/titleBar/TitleBar'
import AlbumList from './albumList/AlbumList'


const New = memo((props) => {
  const { albums } = props
  const newAlbums = [albums.splice(0, 5), albums.splice(10, 5), albums.splice(15, 5), albums.splice(20, 5)]



  return (
    <div>
      <div className={NewStyle.new}>
        <TilteBar title={'新碟上架'}></TilteBar>
       <AlbumList albums={newAlbums}/>
      </div>
    </div>
  )
})

export default New