import data from '@/utils/data.js'
import Product from '@/models/product.js'
import products from '@/store/modules/products.js'

describe('modules/products.js', () => {
  it('make sure method "getAll()" return a correct response.', () => {
    const { actions } = {...products}
    let response
    let count = 0
    const mockCommit = (state, payload) => {
      response = payload
      count += 1
    }
    const dataProduct = data.items.map(item => Product.fromAPI(item))
    actions.getAll({ commit: mockCommit }).finally(() => {
      expect(count).toBe(1)
      expect(response).toEqual(dataProduct)
    })
  })
})
