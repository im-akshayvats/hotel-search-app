import React from 'react';
import { Grid, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles'
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Hotel from './Hotel';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

function HotelsContainer(props) {
  if (props.hotels) {
    return (
      <Box sx={{ flexGrow: 1 }}  className='hotelResultContainer'>
        <Grid container justifyContent={'center'}>
          {props.hotels.map((hotel) => (
            <Grid item xs={3} >
              <Link to={`/hotels/${hotel.id}`} style={{textDecoration: 'none'}}>
                  <Item>
                    <Hotel hotel={hotel} />
                  </Item>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }
  return (
    props.loading ? (
      <div className='hotelResultContainer' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'none', overflow: 'none'}}>
        <Oval 
          height="50"
          width="50"
          color='white'
          ariaLabel='loading'
        />
      </div>
    ) : (
      <></>
    )
  )
}

export default HotelsContainer;