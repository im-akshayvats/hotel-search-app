import React from 'react'
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Hotel from './Hotel';

function HotelsContainer(props) {
  if (props.hotels) {
    return (
      <div className='hotelResultContainer'>
        {props.hotels.map((hotel) => (
          <Link to={`/hotels/${hotel.id}`} >
            <Hotel hotel={hotel} />  
          </Link>
        ))}
      </div>
    )
  }
  return (
    props.loading ? (
      <div className='hotelResultContainer' style={{display: 'flex', justifyContent: 'center', background: 'none', overflow: 'none'}}>
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