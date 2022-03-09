import React from 'react'
import { Typography } from '@mui/material'

function Header() {
  return (
    <div className="heading">
      <Typography variant='h3' mt={3}>
        WELCOME TO <span className='siteName'>HOTELICA</span>
      </Typography>
      <Typography variant='overline'>
        Here you can find some best Hotels around you.
      </Typography>
    </div>
  )
}

export default Header;