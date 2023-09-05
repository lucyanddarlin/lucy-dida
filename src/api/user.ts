import axios from './axios'

export const fetchTest = () =>
  axios({
    url: '/api/getAllUser',
    method: 'GET'
  })
