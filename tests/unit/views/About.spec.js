import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import About from '@/views/About'

describe('About.vue', () => {
  it('render h1 content', () => {
    const msg = 'This is an about page.'
    const localVue = createLocalVue()
    localVue.use(Vuetify)

    const wrapper = shallowMount(About, {
      localVue,
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
