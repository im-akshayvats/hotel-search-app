import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles'
import { Container, Grid, Paper, Typography, Accordion, AccordionDetails, AccordionSummary, Rating } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/navigation";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  
}));

function ControlledAccordions({atAGlance, amenities}) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ flexShrink: 0, fontFamily: 'cursive' }}>
            At a Glance
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h5' color={'GrayText'} >
            Key Features
          </Typography>
          <ul>
            <li>
              <Typography fontFamily='monospace'>
                Arriving And Leaving
              </Typography>
              <ul>
                {atAGlance.keyFacts.arrivingLeaving.map(item => (
                  <li>
                    <Typography variant='body2' color={'GrayText'}>{item}</Typography>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Typography fontFamily='monospace'>
                Hotel Size
              </Typography>
              <ul>
                {atAGlance.keyFacts.hotelSize.map(item => (
                  <li>
                    <Typography variant='body2' color={'GrayText'}>{item}</Typography>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Typography fontFamily='monospace'>
                Documents Needed
              </Typography>
              <ul>
                {atAGlance.keyFacts.requiredAtCheckIn.map(item => (
                  <li>
                    <Typography variant='body2' color={'GrayText'}>{item}</Typography>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function Hotel() {
  let { hotelId } = useParams();
  const [hotelDetail, setHotelDetail] = useState(null);
  const [hotelPhotos, setHotelPhotos] = useState(null);

  useEffect(() => {
    function getHotelPhotos() {
      var options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/properties/get-hotel-photos',
        params: {id: hotelId},
        headers: {
          'x-rapidapi-host': 'hotels4.p.rapidapi.com',
          'x-rapidapi-key': 'b3bc971869mshde3c7ff196c5a0fp1d9df4jsn676fe1f671c0'
        }
      };
      
      axios.request(options)
        .then(function (response) {
          setHotelPhotos(response.data);
        }).catch(function (error) {
          console.error(error);
        });
    }

    function getHotelDetails() {
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
          'x-rapidapi-host': 'hotels4.p.rapidapi.com',
          'x-rapidapi-key': 'b3bc971869mshde3c7ff196c5a0fp1d9df4jsn676fe1f671c0'
        }
      };
      
      axios.request(options)
        .then(function (response) {
          setHotelDetail(response.data);
          getHotelPhotos();
  
        }).catch(function (error) {
          console.error(error);
        });
    }

    if (!hotelDetail) {
      getHotelDetails();
    }
  });

  if (hotelDetail && hotelPhotos) {
    const propertyDescription = hotelDetail.data.body.propertyDescription;
    const atAGlance = hotelDetail.data.body.atAGlance;
    const amenities = hotelDetail.data.body.amenities;
    const size = 'z';
    return (
      <>
        <Container sx={{paddingY: 5}}>
          <Grid container>
            <Grid container spacing={5} marginBottom={5} >
              <Grid item xs={6}>
                <Item>
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    spaceBetween={50}
                  >
                    {hotelPhotos.hotelImages.map(image => (
                      <SwiperSlide >
                        <img src={image.baseUrl.replace('{size}', size)} style={{height: '420px', width: '100%', objectFit: 'cover'}} alt="" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Item>
                <Container sx={{padding: 2, display: 'flex', alignItems: 'center'}}>
                  <Typography variant='h6' color='GrayText' width={100} fontWeight={'bold'}>
                    Rating : 
                  </Typography>
                  <Rating name="half-rating-read" defaultValue={propertyDescription.starRating} precision={0.5} readOnly />
                </Container>
                <Container sx={{display: 'flex', alignItems: 'center'}}>
                  <Typography variant='h6' color='GrayText' width={100} fontWeight={'bold'}>
                    Pricing : 
                  </Typography>
                  <Typography variant='h6' fontWeight={'bold'} fontFamily={'cursive'}>
                    {propertyDescription.featuredPrice.currentPrice.formatted}
                  </Typography>
                </Container>
              </Grid>
              <Grid item xs={6}>
                <div style={{marginBottom: 16}}>
                  <Typography variant='h4' component='div'>
                    {propertyDescription.name}
                  </Typography>
                  <Typography variant='p' component='p' sx={{color: 'text.secondary'}}>
                    <b>{propertyDescription.tagline[0].replace(/[<b></b>]/g, '')}</b>
                  </Typography>
                </div>
                <Typography variant='subtitle2' component='address' sx={{marginBottom: 2}}>
                    {propertyDescription.address.fullAddress}
                </Typography>
                <ControlledAccordions atAGlance= {atAGlance} amenities= {amenities} />
              </Grid>
            </Grid>
            <Grid container spacing={5}>
              
            </Grid>
          </Grid>
        </Container>
      </>
    )
  }
  return <></>
}

export default Hotel