import data from '@/utils/data.js'

const axios = {
  get: () => new Promise(resolve => resolve({ data }))
}

axios.defaults = {
  baseURL: 'https://www.googleapis.com'
}

export default axios
