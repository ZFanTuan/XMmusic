import React, { memo } from 'react'
import { useParams } from 'react-router';

const AlubumDet = memo((props) => {

  const params = useParams()
  console.log(params);
  return (
    <div>AlubumDet</div>
  )
})

export default AlubumDet