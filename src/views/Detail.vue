<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-media
              :src="product.image"
              height="200px"
            ></v-card-media>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0" v-html="product.title"></h3>
                <h4>Authors: {{ authors }}</h4>
                <div class="product-description" v-html="product.description"></div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="teal" :to="{name: 'home'}">
                <v-icon>keyboard_backspace</v-icon> Home
              </v-btn>
              <v-btn flat color="orange"
                :href="product.source"
                target="_blank">Goto Library</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Detail',
  created () {
    this.getDetail()
  },
  computed: {
    ...mapState({
      product: state => state.products.detail
    }),
    ...mapGetters({
      authors: 'products/authors'
    }),
    title () {
      return this.product.volumeInfo.title
    }
  },
  data () {
    return {
      //
    }
  },
  methods: {
    ...mapActions({
      getProduct: 'products/getDetail'
    }),
    getDetail () {
      const self = this
      const id = self.$route.params.id
      self.getProduct(id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.product-description
  margin-top 10px
</style>
