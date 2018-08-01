import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import data from '@/utils/data.js'
import Product from '@/models/product.js'
import products from '@/store/modules/products.js'

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
})
