<template>
  <div id="client">
    <table class="table">
      <tr>
        <th>身份证图片</th>
        <th>店名</th>
        <th>姓名</th>
        <th>账号/手机号</th>
        <th>身份证</th>
        <th>信用额度</th>
        <th>总交易额</th>
        <th>添加时间</th>
        <th>最近下单时间</th>
      </tr>
      <tr v-for="client in filterClients">
        <td><img
            v-bind:src="client.client_id_card_photo"
            alt=""
          ></td>
        <td>{{client.client_shop}}</td>
        <td>{{client.client_name}}</td>
        <td>{{client.client_phone}}</td>
        <td>{{client.client_id_card_num}}</td>
        <td>{{client.client_credit}}</td>
        <td>{{client.turnover}}</td>
        <td>{{client.new_time}}</td>
        <td class="linefeed">{{client.fresh_time}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import {getDate,getSeconds} from '@/common.js'
export default {
  name: "Client",
  data() {
    return {
      clientList: []
    };
  },
  created() {
    const data = {
      token: this.$store.getters.token,
      worker_id: this.$store.getters.worker_id
    };

    this.$axios
      .post("Pcinfo/get_client_info", JSON.stringify(data))
      .then(res => {
        
        this.clientList = res.data.clients_data.data;
        this.clientList.forEach(element => {
          element.new_time = getDate(element.new_time);
          element.fresh_time = getSeconds(element.fresh_time);
        });
      });
  },
  computed: {
    filterClients: function() {
      return this.clientList.filter(client => {
        return (
          client.client_name.match(this.$store.getters.searchTxt) ||
          client.client_phone.match(this.$store.getters.searchTxt)
        );
      });
    }
  }
};
</script>

<style scoped>
.table {
  width: 1200px;
  margin: 0 auto;
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
.table img {
  width: 172px;
  height: 108px;
  margin-top: 3px;
}
.linefeed {
  word-wrap: break-word;
  width: 110px;
}
</style>
