<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-card>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <product
                v-for="(product, index) in products"
                :key="index"
                :product="product"/>
            </v-layout>
          </v-container>
        </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Product from '@/components/Product'

export default {
  name: 'Home',
  components: { Product },
  created () {
    this.getProducts()
  },
  computed: {
    ...mapState({
      products: state => state.products.all,
      favorites: state => state.products.favorites
    })
  },
  data () {
    return {
      //
    }
  },
  methods: {
    ...mapActions({
      getProducts: 'products/getAll'
    })
  }
}
</script>
