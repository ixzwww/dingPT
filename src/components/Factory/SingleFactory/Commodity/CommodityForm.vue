<template>
  <div id="commodityForm">
    <table class="table" id="table">
      <tr class="blod">
        <td>光度</td>
        <td>散光</td>
        <td v-for="ast in astigmatism">{{ast}}</td>
      </tr>
      <tr>
        <td class="blod">球镜</td>
        <td v-for="blank in astigmatism.length+1"></td>
      </tr>
      <tr v-for="sph in sph">
        <td class="blod">{{sph}}</td>
        <td v-for="blank in astigmatism.length+1"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "CommodityForm",
  components: {},
  data() {
    return {
      good_data: {},
      sph: [],
      astigmatism: []
    };
  },
  methods: {
    getData() {
      this.sph = [];
      this.astigmatism = [];
      var commodity_id = this.$route.params.commodity_id;
      var data = {
        commodity_id: commodity_id,
        token: this.$store.getters.token
      };
      Array.prototype.unique = function() {
        let temp = {},
          arr = [];
        for (let i = 0; i < this.length; i++) {
          if (!temp[this[i]]) {
            temp[this[i]] = "mark";
            arr.push(this[i]);
          }
        }
        return arr;
      };
      this.$axios.post("Pcinfo/get_good", JSON.stringify(data)).then(res => {
        let resData = res.data.good_data.data;
      

        resData.forEach(element => {
          this.sph.push(element.sph);
          this.astigmatism.push(element.astigmatism);
        });

        this.sph = this.sph.unique().sort();
        this.astigmatism = this.astigmatism.unique().sort();

        //$nextTick dom渲染完成后再进行操作
        this.$nextTick(function() {
          resData.forEach(ele => {
            let row = this.sph.indexOf(ele.sph) + 2;
            let cell = this.astigmatism.indexOf(ele.astigmatism) + 2;
            let num = ele.good_inventory;
            document.getElementById("table").rows[row].cells[
              cell
            ].innerHTML = num;
          });
        });
      });
    }
  },
  created() {
    this.getData();
  },
  //监听路由参数变化
  watch: {
    $route: "getData"
  }
};
</script>

<style scoped>
.table {
  width: 550px;
  float: right;
  border-left: 1px solid #00aa99;
  border-top: 0;
  border-collapse: collapse;
}
.table td {
  height: 30px;
  width: 100px;
  border-bottom: 1px solid #00aa99;
  border-right: 1px solid #00aa99;
  text-align: center;
  font-size: 17px;
}
.blod {
  font-weight: 600;
}
</style>
