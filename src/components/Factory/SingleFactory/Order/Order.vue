<template>
  <div id="order">
    <table class="table">
      <tr>
        <th>日期时间</th>
        <th>订单编号</th>
        <th>客户</th>
        <th>价格</th>
      </tr>

      <tr
        v-for="order in filterOrders"
        @click="showForm(order.trade_id)"
        :class="order.trade_id == trade_id ? 'active' : ''"
        class="light"
      >
        <td>{{order.new_time}}</td>
        <td>{{order.trade_id}}</td>
        <td>{{order.client_shop}}</td>
        <td>{{order.consume}}</td>

      </tr>

    </table>
    <router-view></router-view>
  </div>
</template>

<script>
import {getDate,getSeconds} from '@/common.js'

export default {
  name: "Order",
  components: {},
  data() {
    return {
      orders: [],
      trade_id: ""
    };
  },
  created() {
    const data = {
      token: this.$store.getters.token,
      worker_id: this.$store.getters.worker_id
    };
    this.trade_id = this.$route.params.trade_id;

    this.$axios.post("Pcinfo/get_sell", JSON.stringify(data)).then(res => {
      this.orders = res.data.good_data.data;
      this.orders.forEach(element => {
        element.new_time = getSeconds(element.new_time);
      });
      const firstForm = this.orders[0].trade_id;
      this.showForm(firstForm);
    });
  },
  methods: {
    showForm(trade_id) {
      this.$router.push({
        name: "orderFormLink",
        params: {
          trade_id: trade_id
        }
      });
    },
    //获取路由参数高亮
    active() {
      this.trade_id = this.$route.params.trade_id;
    }
  },
  computed: {
    filterOrders: function() {
      return this.orders.filter(order => {
        return (
          order.trade_id.toString().match(this.$store.getters.searchTxt) ||
          order.client_shop.match(this.$store.getters.searchTxt)
        );
      });
    }
  },
  watch: {
    $route: "active"
  }
};
</script>

<style scoped>
#order {
  width: 1200px;
  margin: 0 auto;
}
.table {
  width: 600px;

  border-left: 1px solid #00aa99;
  border-top: 0;
  border-collapse: collapse;
  float: left;
}
.table td,
th {
  height: 30px;
  border-bottom: 1px solid #00aa99;
  border-right: 1px solid #00aa99;
  text-align: center;
  font-size: 17px;
}
.table .light:hover {
  cursor: pointer;
}
.table .light:hover {
  background-color: #00cc99;
  color: aliceblue;
}
.active {
  background-color: #00cc99;
  color: aliceblue;
}
</style>
