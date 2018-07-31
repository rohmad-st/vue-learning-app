<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>{{ msg }}</h1>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  props: {
    msg: {
      type: String,
      default: 'This is an about page.'
    }
  }
}
</script>
