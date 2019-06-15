<template>
  <div id="navigator">
    <ul class="nav">
      <li>
        <router-link
          :to="{name:'clientLink'}"
        
        >客户信息</router-link>
      </li>
      <li>
        <router-link
          :to="{name:'commodityLink'}"
          
        >商品信息</router-link>
      </li>
      <li>
        <router-link
          :to="{name:'orderLink'}"
          
        >历史订单</router-link>
      </li>
      <li>
        <router-link
          :to="{name:'financeLink'}"
          
        >财务报表</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navigator",
  components: {}
};
</script>

<style scoped>
#navigator {
  width: 1200px;
  margin: 0 auto;
}
.nav {
}
.nav::after {
  content: "";
  clear: both;
  display: block;
}
.nav li {
  float: left;
  text-align: center;
  border: 1px solid #00aa99;
  border-bottom: 2px solid #00aa99;
}
ul li a {
  display: block;
  color: black;
  width: 298px;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  font-weight: 500;
}
li a:hover {
    background-color: #00cc99;
  color: aliceblue;
}
.router-link-active {
  background-color: #00cc99;
  color: aliceblue;
}
.router-link-active:hover {
  color: aliceblue;
}
</style>
