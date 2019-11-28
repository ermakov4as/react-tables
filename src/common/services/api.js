import { BASE_URL } from './urls';

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

export default fetchData();