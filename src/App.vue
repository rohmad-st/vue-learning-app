<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(route, i) in routes"
          :key="i"
          :to="{ name: route.name }">
          <v-list-tile-action>
            <v-icon
              class="teal--text"
              v-html="route.meta.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title
              class="teal--text"
              v-text="route.meta.caption"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span class="text-center">
        Build with &hearts; by Rohmad using
        <a href="https://vuejs.org/"
          target="_blank"
          class="no-style teal--text">Vue.js</a>
        &copy; 2018
      </span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      routes: this.$router.options.routes.filter((route) => route.meta.hidden !== true)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .text-center
    width 100%
    text-align center
  .no-style
    text-decoration none
</style>
