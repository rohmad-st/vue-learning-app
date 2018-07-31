import productClient from '@/api/products'
import Product from '@/models/product'

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
    if (!state.favorites) return -1
    return state.favorites.findIndex(favorite => favorite.id === id)
  },
  isFavorite: (state) => (id) => {
    if (!state.favorites) return false
    const favoriteIds = state.favorites.map(favorite => favorite.id)
    return favoriteIds.indexOf(id) > -1
  },
  authors: (state) => {
    if (!state.detail || !state.detail.authors) return ''
    return state.detail.authors.join(', ')
  }
}

// actions
const actions = {
  getDummiesProduct ({ commit }) {
    const response = productClient.getDummies()
    const products = response.items.map(it => Product.fromAPI(it))
    commit('setProducts', products)
  },
  getAll ({ commit }) {
    const defaultProducts = state.all
    return productClient.getProducts()
      .then((response) => {
        const products = response.items.map(it => Product.fromAPI(it))
        commit('setProducts', products)
      }, () => {
        commit('setProducts', defaultProducts)
      }).catch(() => {
        commit('setProducts', defaultProducts)
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
    state.all = products
  },
  setDetail (state, product) {
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
    state.favorites.push(product)
  },
  removeAsFavorite (state, index) {
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
