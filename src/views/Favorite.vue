<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-card>
          <v-container fluid grid-list-md>
            <v-layout row wrap v-if="favorites && favorites.length > 0">
              <product
                v-for="(product, index) in favorites"
                :key="index"
                :product="product"/>
            </v-layout>
            <v-layout row wrap v-else>
              <span>Not data found.</span>
            </v-layout>
          </v-container>
        </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import Product from '@/components/Product'

export default {
  name: 'Favorite',
  components: { Product },
  computed: {
    ...mapState({
      favorites: state => state.products.favorites
    })
  },
  data () {
    return {
      //
    }
  },
  methods: {
    //
  }
}
</script>
