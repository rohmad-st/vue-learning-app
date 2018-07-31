import axios from 'axios'
import data from '@/utils/data.js'

axios.defaults.baseURL = process.env.VUE_APP_HOST

const KEY = process.env.VUE_APP_KEY

export default {
  getDummies () {
    return data
  },
  getProducts () {
    return axios.get(`/books/v1/volumes?q=javascript&key=${KEY}`)
      .then((response) => {
        return response.data
      }, (error) => {
        return error
      }).catch((error) => {
        return error
      })
  },
  getDetailProduct (id) {
    return axios.get(`/books/v1/volumes/${id}?key=${KEY}`)
      .then((response) => {
        return response.data
      }, (error) => {
        return error
      }).catch((error) => {
        return error
      })
  }
}
