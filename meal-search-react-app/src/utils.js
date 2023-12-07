export const splitParams = (search) => {
  const params = search.slice(1).split('&');
  return params.reduce((acc, item) => {
    const [key, value] = item.split('=');
    acc[key] = value;
    return acc;
  }, {});
};