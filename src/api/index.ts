import axios from './axios'

export const fetchTest = () =>
  axios({
    url: '/api/getUserInfo',
    method: 'GET'
  })
