<template>
  <v-flex>
    <v-card :to="{ name: 'detail', params: { id: product.id } }">
      <v-card-media
        :src="product.image"
        height="200px"
      >
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline teal--text"
                v-text="product.title"></span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="toggleFavorite(product)">
          <v-icon>{{ this.isFavorite(this.product.id) ? 'favorite' : 'favorite_border' }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Product from '@/models/product'

export default {
  name: 'Product',
  props: {
    product: {
      type: Product,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      isFavorite: 'products/isFavorite'
    })
  },
  data () {
    return {
      id: null,
      title: '',
      image: ''
    }
  },
  methods: {
    ...mapActions({
      toggleFavorite: 'products/toggleFavorite'
    })
  }
}
</script>
