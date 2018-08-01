import data from '@/utils/data.js'

const axios = {
  defaults: {
    baseURL: ''
  },
  get: () => new Promise(resolve => resolve({ data }))
}

export default axios
