import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Product from '@/components/Product'
import ModelProduct from '@/models/product.js'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

describe('Product.vue', () => {
  // const factory = (values = {}) => {
  //   return shallowMount(Product, {
  //     propsData: { ...values }
  //   })
  // }
  let actions
  let getters
  let store

  beforeEach(() => {
    actions = {
      toggleFavorite: jest.fn()
    }
    getters = {
      'products/isFavorite': (id) => jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      getters,
      actions
    })
  })

  it('render h1 content', () => {
    const product = new ModelProduct(1, 'judul', 'http://via.placeholder.com/150x150')
    const wrapper = shallowMount(Product, {
      store,
      localVue,
      propsData: { product }
    })
    expect(wrapper.find('.headline').text()).toBe('judul')
  })
})
