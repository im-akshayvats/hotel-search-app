import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Hotel() {
  let { hotelId } = useParams();
  const [hotelDetail, setHotelDetail] = useState(null);

  useEffect(() => {
    var options = {
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/properties/get-details',
      params: {
        id: hotelId,
        checkIn: '2020-01-08',
        checkOut: '2020-01-15',
        adults1: '1',
        currency: 'USD',
        locale: 'en_US'
      },
      headers: {


        
      }
    };
    
    axios.request(options)
      .then(function (response) {
        console.log(response.data);
        setHotelDetail(response.data);

      }).catch(function (error) {
        console.error(error);
      });
  }, [hotelId]);

  if (hotelDetail) {
    return (
      <div>{hotelDetail.data.body.propertyDescription.name}</div>
    )
  }
  return <></>
}

export default Hotel