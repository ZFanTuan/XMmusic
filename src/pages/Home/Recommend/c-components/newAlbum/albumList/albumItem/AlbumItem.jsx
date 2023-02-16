import React, { memo } from 'react'
import AlbumItemStyle from './AlbumItem.module.less'

const AlbumItem = memo((props) => {
  const { album } = props
  return (
    <div className={AlbumItemStyle.album}>
      <div className={AlbumItemStyle.img}>
        <img src={album.blurPicUrl} alt="" title={album.name} />
        <div className={AlbumItemStyle.mask}></div>
      </div>
      <span>{album.name}</span>
      <span>{album.artist.name}</span>
    </div>
  )
})

export default AlbumItem