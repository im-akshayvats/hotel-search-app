import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchEngine(props) {
  const [keywords, setKeywords] = useState('');
  const [keyPressed, setKeyPressed] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    function fetchData(query) {
      var options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
        params: {query, locale: 'en_US', currency: 'USD'},
        headers: {




        }
      };
      
      axios.request(options)
        .then(function (response) {
          setDestination(response.data.suggestions[0].entities[0].destinationId)
        }).catch(function (error) {
          console.error(error);
        });
    }
    function fetchPropertyList(destinationId) {
      var options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/properties/list',
        params: {
          destinationId: destination,
          pageNumber: '1',
          pageSize: '25',
          checkIn: '2020-01-08',
          checkOut: '2020-01-15',
          adults1: '1',
          sortOrder: 'PRICE',
          locale: 'en_US',
          currency: 'USD'
        },
        headers: {
          


          
        }
      };
      
      axios.request(options)
        .then(function (response) {
          props.setHotels(response.data.data.body.searchResults.results);
        }).catch(function (error) {
          console.error(error);
        });
    }
    if (keywords.length && keyPressed) {
      props.setLoading(true);
      props.setHotels(null);
      fetchData(keywords);
      setKeyPressed(null);
    }
    if (destination) {
      fetchPropertyList(destination)
      setDestination(null);
    }
  }, [keywords.length, keyPressed, props, keywords, destination] )

  return (
    <div className="searchEngine">
      <input
        type="text"
        name="search"
        id="searchField"
        placeholder='Search...'
        value={keywords}
        onInput={e => {
          setKeywords(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setKeyPressed(e.key);
          } else if (keyPressed) {
            setKeyPressed(null);
          }
        }}
      />
    </div>
  )
}

export default SearchEngine;