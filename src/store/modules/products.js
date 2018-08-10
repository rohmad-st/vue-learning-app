import productClient from '@/api/products'
import Product from '@/models/product'
import { PRODUCTS as types } from '../mutations'

// initial states
const state = {
  all: [],
  favorites: [],
  detail: new Product()
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
    commit(types.SET_PRODUCTS, products)
  },
  getAll ({ dispatch, commit }) {
    const defaultProducts = state.all
    if (process.env.VUE_APP_OFFLINE) return dispatch('getDummiesProduct')
    return productClient.getProducts()
      .then((response) => {
        const products = response.items.map(it => Product.fromAPI(it))
        commit(types.SET_PRODUCTS, products)
      }, () => {
        commit(types.SET_PRODUCTS, defaultProducts)
      }).catch(() => {
        commit(types.SET_PRODUCTS, defaultProducts)
      })
  },
  /**
   * Get detail of product
   *
   * @param {String} id - ID of volume
   */
  getDetail ({ commit }, id) {
    return productClient.getDetailProduct(id).then((response) => {
      const detail = Product.fromAPI(response)
      commit(types.SET_DETAIL, detail)
    })
  },
  /**
   * Add or remove product as favorite
   *
   * @param {Object} product
   */
  toggleFavorite ({ commit, getters }, product) {
    if (getters.isFavorite(product.id)) {
      commit(types.REMOVE_AS_FAVORITE, getters.favoriteIndex(product.id))
    } else {
      commit(types.ADD_AS_FAVORITE, product)
    }
  }
}

// mutations
const mutations = {
  [types.SET_PRODUCTS] (state, products) {
    state.all = products
  },
  [types.SET_DETAIL] (state, product) {
    Object.assign(state.detail, product)
  },
  [types.ADD_AS_FAVORITE] (state, product) {
    state.favorites.push(product)
  },
  [types.REMOVE_AS_FAVORITE] (state, index) {
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
