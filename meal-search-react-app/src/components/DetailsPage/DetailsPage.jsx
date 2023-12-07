import { useLoaderData, useLocation, NavLink } from 'react-router-dom';
import {splitParams} from '../../utils';
export const DetailsPage = () => {
  let location = useLocation();
  const items = location.pathname.split('/')
  console.log(items[items.length - 1])
  return <h2>DetailsPage</h2>
}