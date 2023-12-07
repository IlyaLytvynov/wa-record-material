import { useEffect, useState, useCallback } from 'react';
import { useLoaderData, useLocation, NavLink } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import {splitParams} from '../../utils';


export const SearchPage = () => {
  let location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = useCallback(async () => {
    const { q } = splitParams(location.search);
    const response = await fetch(
      `https://themealdb.com/api/json/v1/1/filter.php?i=${q}`
    );
    if (response.status !== 200) {
      throw Error(response.message);
    }

    const data = await response.json();
    return data.meals;
  }, [location]);

  const search = useCallback(async () => {
    const data = await fetchData();
    setSearchResults(data);
  }, [fetchData, setSearchResults]);

  useEffect(() => {
    search();
  }, [search]);

  console.log(searchResults);
  return (
    <ImageList cols={3} sx={{}}>
      {searchResults.map((item) => (
        <ImageListItem key={item.idMeal}>
          <img
            src={`${item.strMealThumb}?w=248&fit=crop&auto=format`}
            alt={item.strMeal}
            loading='lazy'
          />
          <ImageListItemBar
            title={item.strMeal}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.strMeal}`}
              >
                <NavLink to={`/details/${item.idMeal}`}>
                  <InfoIcon />
                </NavLink>
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
