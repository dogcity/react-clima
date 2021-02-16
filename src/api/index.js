import axios from 'axios'

export default (url, params) => {
    return axios.get(url, params)
        .then(response => response.data)
        .catch(error => console.log('ERROR API', error))
}