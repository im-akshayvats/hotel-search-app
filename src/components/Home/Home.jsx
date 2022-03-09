import React, {useState} from 'react';
import { Container } from '@mui/material';
import Header from './Header';
import SearchEngine from './SearchEngine';
import HotelsContainer from './HotelsContainer';
import './style.scss';


function Home() {
  const [hotels, setHotels] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className='rootContainer'>
      <Container>
        <section className='heroSection'>
          <Header />
          <SearchEngine setHotels={setHotels} setLoading={setLoading} />
          <HotelsContainer hotels={hotels} loading={loading} />
        </section>
      </Container>
    </div>
  )
}

export default Home;