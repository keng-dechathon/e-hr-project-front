import axios from 'axios'
import { getCookieFromBrowser } from './cookie'

export default () => {
  return axios.create({
    baseURL: process.env.React_App_API_URL,
    responseType: 'json',
    headers: {
      Authorization: `Bearer ${
        getCookieFromBrowser('a') ? getCookieFromBrowser('a') : ''
      }`,
    },
  })
}
