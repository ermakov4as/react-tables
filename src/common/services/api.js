import { BASE_URL } from '../constants/urls';

/* function fetchData(url, params=null) {
  let success = false;
  let data = {};
  const req = fetch(`${BASE_URL}${url}`, params)
    .then(response => {
      success = true;
      // data = response.json();
      return response.json();
    })
    // .then(response => {
    //    data = req;
    //   console.log(data)
    // })
    .catch(error => console.error(error));
  return {data, success};
} */

async function fetchData(url, params=null) {
  let success = false;
  const req = fetch(`${BASE_URL}${url}`, params)
    .then(response => {
      success = true;
      return response.json();
    })
    .catch(error => console.error(error));
  const data = await req;
  return {data, success};
}

/* async function fetchData(url, params=null) { // При этом - async / await и при вызове функции
  let success = false;
  let data = {};
  try {
    const req = await fetch(`${BASE_URL}${url}`, params)
    data = await req.json();
    success = true;
  } catch (error) {
    console.log(error);
  }
  return {data, success};
} */

export default fetchData;