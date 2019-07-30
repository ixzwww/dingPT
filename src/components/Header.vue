<template>
  <div id="appheader">
    <div class="header-wrapper">
          <div
      class="logout"
      @click="logout"
    >
      <span>退出</span>
    </div>
    <h1>定配通——后台管理系统</h1>

    <div class='nav'>
      <ul v-if="isAdmin">
        <li>
          <router-link
            :to="{name:'adminLink'}"
            class=""
            exact
          >管理员</router-link>
        </li>
        <li>
          <router-link
            :to="{name:'factoryLink'}"
            class=""
            exact
          >加工房</router-link>
        </li>
      </ul>
      <div class="search">
        <form @submit.prevent="search">
          <input
            type="text"
            value="搜索"
            v-model.trim="searchTxt"
            placeholder="搜索姓名/账号/订单编号"
          >
          <button
            type="submit"
            class="searchBtn"
            value=""
          ></button>
        </form>
      </div>
    </div>

  </div>
    </div>

</template>

<script>
export default {
  name: "appheader",
  data() {
    return {
      // searchTxt: "",
      isAdmin:false
    };
  },
  created(){
    this.isAdmin = this.$store.getters.isAdmin;
  },
  methods: {
    search() {
      this.$store.commit("setSearchTxt", this.searchTxt);
    },
    logout() {
      this.$store.commit("userStatus", "");
      this.$router.push({ name: "loginLink" });
    },
    clearSearch(){
      this.$store.commit("setSearchTxt", '');
    }
  },
  //对vuex里的数据进行双向绑定
  computed:{
    searchTxt:{
      get(){
        return this.$store.getters.searchTxt
      },
      set(value){
        this.$store.commit('setSearchTxt',value)
      }
    }
  },
  watch:{
    $route:'clearSearch'
  }
};
</script>

<style scoped>

#appheader {
  width: 100%;
  
  height: 103px;
  border-bottom: #00cc99 2px solid;
}
.header-wrapper{
  width: 1200px;
  margin: 0 auto;
}
@media screen and (max-width: 960px)
{
#appheader { width:1200px; }
}
.logout {
  float: right;
  border: #00cc99 1px solid;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: 10px;
  padding: 2px;
  background-color: #00cc99;
  color: aliceblue;
}
.logout:hover {
  cursor: pointer;
}
h1 {
  display: block;
  width: 400px;
  font-weight: 400;
  margin: 0 auto;
  line-height: 50px;
}
.nav {
  height: 50px;
  width: 1000px;
  margin: 0 auto;
}
.nav li {
  float: left;
  font-size: 20px;
  margin-right: 10px;
}
ul li a {
  display: inline-block;
  padding: 0 10px;
  line-height: 50px;
  border-bottom: 2px solid #fff;
  color: black;
  border-radius: 4px;
}
li a:hover {
  color: #00cc99;
}
.router-link-active {
  background-color: #00cc99;
  color: aliceblue;
  border-bottom: #00cc99 2px solid;
}
.router-link-active:hover {
  color: aliceblue;
}

.search {
  width: 400px;
  height: 80px;
  float: right;
}
.search input {
  width: 250px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  margin-top: 15px;
  margin-left: 110px;
  float: left;
}
.search input:focus {
  box-shadow: 0px 0px 10px #00cc99;
  border: 1px #00cc99 solid;
}
.searchBtn {
  width: 30px;
  height: 31px;
  float: left;
  margin-top: 15px;
  background-color: #00cc99;
  background-image: url(../assets/search.png);
  background-size: 100% 100%;
  border: 1px #00cc99 solid;
  border-radius: 5px;
  outline: none;
}
.searchBtn:hover {
  cursor: pointer;
}
</style>
