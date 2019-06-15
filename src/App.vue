<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  
  provide() {
    return {
      reload: this.reload//项目刷新不白屏
    };
  },
  data() {
    return {
      isRouterAlive: true//项目刷新不白屏
    };
  },
  methods: {
    reload() {//项目刷新不白屏
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
}
</style>
