import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Home from './components/Home/Home';
import Hotels from './components/Hotel/Hotels';

export const App = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hotels/:hotelId' element={<Hotels />} >
          </Route>
          <Route path='/*' element={<h1>Not found</h1>} />
        </Routes>
      </Router>
    </>
  )
}