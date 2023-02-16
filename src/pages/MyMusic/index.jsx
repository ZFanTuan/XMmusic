import React, { memo } from 'react'
import { Outlet } from "react-router"
const MyMusic = memo(() => {
  return (
    <div>MyMusic

      <Outlet></Outlet>
    </div>
  )
})

export default MyMusic