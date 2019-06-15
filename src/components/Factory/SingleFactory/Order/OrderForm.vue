<template>
  <div id="orderform">
    <table class="table">
      <tr>
        <th colspan="4">{{good_data.good_name}}({{good_data.type}})</th>
        <th>日期时间</th>
      </tr>
      <tr>
        <td>位置</td>
        <td>球镜</td>
        <td>散光</td>
        <td>轴位</td>
        <td>{{good_data.new_time}}</td>
      </tr>
      <tr>
        <td>R:</td>
        <td>{{good_data.sph_r}}</td>
        <td>{{good_data.a_r}}</td>
        <td>{{good_data.r_axial}}</td>
        <td
          rowspan="4"
          class="t_d"
        >备注:<span>{{good_data.remark}}</span></td>
      </tr>
      <tr>
        <td>L:</td>
        <td>{{good_data.sph_l}}</td>
        <td>{{good_data.a_l}}</td>
        <td>{{good_data.l_axial}}</td>
      </tr>
      <tr>
        <td colspan="2">瞳距:{{good_data.eye_distance}}</td>
        <td
          rowspan="2"
          colspan="2"
        ></td>
      </tr>
      <tr>
        <td colspan="2">瞳高:{{good_data.eye_high}}</td>
      </tr>
      <tr>
        <td colspan="2">ADD:{{good_data.eye_add}}</td>
        <td colspan="3">数量:{{good_data.num}}</td>
      </tr>
      <tr>
        <td colspan="5">客户名称:{{good_data.client_shop}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "OrderForm",
  components: {},
  data() {
    return {
      good_data: {}
    };
  },
  methods: {
    getData() {
      var trade_id = this.$route.params.trade_id;
      var data = {
        trade_id: trade_id,
        token: this.$store.getters.token
      };
    function getSeconds(date) {
      if (date != 0) {
        var t = new Date(date * 1000);
        return (
          t.getFullYear() +
          "/" +
          (t.getMonth() + 1) +
          "/" +
          t.getDate() +
          " " +
          t.getHours() +
          ":" +
          t.getMinutes() +
          ":" +
          t.getSeconds()
        );
      } else {
        return "暂无";
      }
    }
      this.$axios
        .post("Pcinfo/get_detail_sell", JSON.stringify(data))
        .then(res => {
          this.good_data = res.data.good_data;
          this.good_data.new_time = getSeconds(this.good_data.new_time);

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
#orderForm {
}
.table {
  width: 550px;
  float: right;
  border-left: 1px solid #00aa99;
  border-top: 0;
  border-collapse: collapse;
}
.table td,
th {
  height: 30px;
  border-bottom: 1px solid #00aa99;
  border-right: 1px solid #00aa99;
  text-align: center;
  font-size: 17px;
}
.table .t_d {
  text-align: left;
  vertical-align: top;
  padding: 10px;
  width: 200px;
}
.table .t_d span {
  display: block;
  width: 200px;
  /* word-wrap: break-word; */
  word-break: break-all;
}
</style>
