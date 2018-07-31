import axios from 'axios'
import data from './dummies/data.js'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_HOST
  // headers: {
  //   Authorization: `Bearer ${__API_KEY__}`
  // }
})

export default {
  getDummies () {
    return data
  },
  getProducts () {
    return httpClient.get(`/books/v1/volumes?q=javascript&key=${process.env.VUE_APP_KEY}`).then((response) => {
      console.log('get all!', response.data)
      return response.data
    }, (error) => {
      return error
    }).catch((error) => {
      return error
    })
  },
  getDetailProduct (id) {
    return httpClient.get(`/books/v1/volumes/${id}?key=${process.env.VUE_APP_KEY}`).then((response) => {
      console.log('get detail!', response.data)
      return response.data
    }, (error) => {
      return error
    }).catch((error) => {
      return error
    })
  }
}
