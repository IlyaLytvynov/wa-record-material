import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';
import ImageList from '@mui/material/ImageList';

const makeSearch = async () => {
  const response = await fetch(
    'https://themealdb.com/api/json/v1/1/random.php'
  );
  if (response.status !== 200) {
    throw Error(response.message);
  }

  const data = await response.json();
  return data.meals[0];
};

export const RandomMealPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const items = await makeSearch();
      console.log('>>>>', items);
      setData(items);
    } catch (e) {
      setError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      {data ? (
        <>
          <ImageListItem sx={{ margin: '0 auto', width: 300, height: 450 }}>
            <img src={data.strMealThumb} loading='lazy' />
          </ImageListItem>
          <Typography align='center' variant='h2'>{data.strMeal}</Typography>
          <Typography align='center' variant='p'>{data.strInstructions}</Typography>
          
        </>
      ) : (
        'Loading'
      )}
    </Box>
  );
};
