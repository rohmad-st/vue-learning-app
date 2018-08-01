<template>
  <div>Odd or even number.</div>
</template>

<script>
export default {
  name: 'OddEvenNumber',
  props: {
    even: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  computed: {
    numbers () {
      // get array of numbers with param props "max"
      const data = [...Array(this.max).keys()]
      const results = (this.even) ? data.filter((dt) => dt % 2 === 0) : data.filter((dt) => dt % 2 !== 0)
      return results.join(', ')
    }
  }
}
</script>
