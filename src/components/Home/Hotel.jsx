import React from 'react';
import { Card, CardMedia, CardContent, Typography, Rating } from '@mui/material'

function Hotel(props) {
  return (
    <>
      <Card
        style={{backgroundColor: '#1e1e1e'}}
      >
        <CardMedia
          component="img"
          height="160"
          image={props.hotel.optimizedThumbUrls.srpDesktop}
          alt={props.hotel.name}
        />
        <CardContent>
          <Typography sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }} gutterBottom variant='p' component="div">
            {props.hotel.name}
          </Typography>
          <Rating name="half-rating-read" value={props.hotel.starRating} precision={0.5} readOnly />
        </CardContent>
      </Card>
    </>
  )
}

export default Hotel;