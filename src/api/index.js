import axios from 'axios'

export default (url, params) => {
    console.log(params);
    return axios.get(url, params)
        .then(response => response.data)
        .catch(error => console.log('ERROR API', error))
}