import productClient from '@/api/products'
import { Product } from '@/models/product'

// initial states
const state = {
  all: [],
  favorites: [],
  detail: {
    title: '',
    thumbnail: '',
    authors: ''
  }
}

// getters
const getters = {
  favoriteIndex: (state) => (id) => {
    return state.favorites.findIndex(favorite => favorite.id === id)
  },
  isFavorite: (state) => (id) => {
    const favoriteIds = state.favorites.map(favorite => favorite.id)
    return favoriteIds.indexOf(id) > -1
  },
  authors: (state) => {
    return state.detail.authors.join(', ')
  }
}

// actions
const actions = {
  getDummiesProduct ({ commit }) {
    const response = productClient.getDummies()
    const products = response.map(it => Product.fromAPI(it))
    commit('setProducts', products)
  },
  getAll ({ commit }) {
    productClient.getProducts()
      .then((response) => {
        const products = response.items.map(it => Product.fromAPI(it))
        commit('setProducts', products)
      })
  },
  /**
   * Get detail of product
   *
   * @param {String} id - ID of volume
   */
  getDetail ({ commit }, id) {
    productClient.getDetailProduct(id).then((response) => {
      commit('setDetail', response)
    })
  },
  /**
   * Add or remove product as favorite
   *
   * @param {Object} product
   */
  toggleFavorite ({ commit, getters }, product) {
    if (getters.isFavorite(product.id)) {
      commit('removeAsFavorite', getters.favoriteIndex(product.id))
    } else {
      commit('addAsFavorite', product)
    }
  }
}

// mutations
const mutations = {
  setProducts (state, products) {
    console.log('set products!', products)
    state.all = products
  },
  setDetail (state, product) {
    console.log('set detail product!', product)
    const info = product.volumeInfo
    const images = info.imageLinks
    const thumbnail = (images && images.thumbnail) ? images.thumbnail : ''
    const params = {
      title: info.title,
      thumbnail,
      authors: info.authors
    }
    Object.assign(state.detail, params)
  },
  addAsFavorite (state, product) {
    console.log('add as favorite!', product)
    state.favorites.push(product)
  },
  removeAsFavorite (state, index) {
    console.log('remove as favorite!', index)
    state.favorites.splice(index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
