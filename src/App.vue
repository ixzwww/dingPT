<template>
  <div id="app">
    <div class="mask" v-if="isMask"></div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  
  provide() {
    return {
      reload: this.reload,//项目刷新不白屏
      mask: this.mask
    };
  },
  data() {
    return {
      isRouterAlive: true,//项目刷新不白屏
      isMask:false,
    };
  },
  methods: {
    reload() {//项目刷新不白屏
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    mask(){
      this.isMask = !this.isMask;
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
.mask{
  width: 100%;
  height: 100%;
  background-color: #333;
  position: fixed;
  opacity: 0.8;
}
</style>
