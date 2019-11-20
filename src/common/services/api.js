import { BASE_URL } from './urls'

export async function fetchData(url, params=null) {
  let success = false;
  let req = fetch(`${BASE_URL}${url}`, params)
    .then(response => {
      success = true;
      return response.json();
    })
    .catch(error => console.error(error))
  let data = await req
  return {data, success}
}