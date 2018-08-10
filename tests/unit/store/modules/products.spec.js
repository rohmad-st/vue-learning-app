import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import data from '@/utils/data.js'
import Product from '@/models/product.js'
import products from '@/store/modules/products.js'
// import { PRODUCTS as types } from '@/mutations'

describe('modules/products.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  let store
  beforeEach(() => {
    // from modules "products", we have state, getters, actions, mutations
    store = new Vuex.Store({...products})
  })

  it('make sure method "getAll()" return a correct response.', () => {
    const dataProduct = data.items.map(item => Product.fromAPI(item))
    return store.dispatch('getAll')
      .then(() => {
        expect(store.state.all).toEqual(dataProduct)
      })
  })

  it('make sure method "toggleFavorite()" can added product as favorite.', () => {
    const productSelected = store.state.all[0]
    return store.dispatch('toggleFavorite', productSelected)
      .then(() => {
        expect(store.state.favorites.length).toBe(1)
        expect(store.state.favorites[0]).toEqual(productSelected)
      })
  })

  it('make sure method "toggleFavorite()" can remove product as favorite.', () => {
    const productSelected = store.state.all[0]
    return store.dispatch('toggleFavorite', productSelected)
      .then(() => {
        expect(store.state.favorites.length).toBe(0)
      })
  })

  it('should return index of favorite product', () => {
    store.state.all.forEach((all, index) => {
      if (index >= 3) return
      store.state.favorites.push(all)
    })
    expect(store.getters.favoriteIndex(store.state.favorites[1].id)).toBe(1)
  })

  it('should return status favorite of products', () => {
    expect(store.getters.isFavorite(store.state.favorites[0].id)).toBe(true)
  })
})
