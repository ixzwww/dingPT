<template>
  <div id="finance">
    <ul>
      <li>年份</li>
      <li v-for="year in yearList" >
        <router-link :to="{name:'yearLink',params:{year_id:year}}" >{{year}}</router-link>
      </li>
    </ul>
    <ul>
      <li>月份</li>
      <li v-for="month in months">
        <router-link :to="{name:'monthLink',params:{month_id:month,year_id:year_id}}" exact >{{month}}月</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Finance",
  components: {},
  data(){
    return{
      yearList:[],
      year_id:'',
      months:[1,2,3,4,5,6,7,8,9,10,11,12]
    }
  },
  created(){
    var newYear = new Date().getFullYear();

    for(let i = newYear; i >= 2019; i--){
      this.yearList.push(i);
    }
    this.year_id = this.yearList[0];
    this.$router.push({
      name:'yearLink',
      params:{
        year_id:this.year_id
      }
    })

  },
  methods:{
    changeYear(){
      this.year_id = this.$route.params.year_id;
    }
  },
  watch:{
    $route:'changeYear'
  }
};
</script>

<style scoped>
#finance{
  width: 1200px;
  margin: 0 auto;
}
ul{
  float: left;
  border-left: 1px solid #00aa99;
  border-top: 1px solid #00aa99;

}
li{
  border-right: 1px solid #00aa99;
  border-bottom: 1px solid #00aa99;
  text-align: center;
  font-size: 18px;
}
li a{
  display: block;
  padding: 3px 20px;
  color: #000;
}
li a:hover {
  color: #00cc99;
}
.router-link-active {
  background-color: #00cc99;
  color: aliceblue;
}
.router-link-active:hover {
  color: aliceblue;
}
</style>
