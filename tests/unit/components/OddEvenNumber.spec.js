import OddEvenNumber from '@/components/OddEvenNumber'

describe('OddEvenNumber.vue', () => {
  it('get correct event numbers', () => {
    const localThis = {
      even: true,
      max: 11
    }

    expect(OddEvenNumber.computed.numbers.call(localThis)).toBe('0, 2, 4, 6, 8, 10')
  })

  it('get correct odd numbers', () => {
    const localThis = {
      even: false,
      max: 10
    }

    expect(OddEvenNumber.computed.numbers.call(localThis)).toBe('1, 3, 5, 7, 9')
  })
})
