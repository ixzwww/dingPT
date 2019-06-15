<template>
  <div id="home">
      <app-header></app-header>
      <router-view></router-view> 
  </div>
</template>

<script>
import Header from './Header'

export default {
  name: 'Home',
  components: {
      appHeader:Header
  }
}
</script>

<style scoped>
  
</style>
