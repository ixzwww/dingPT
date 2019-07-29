<template>
  <div id="singleFactory">
    <table class="table">
      <tr>
        <th>身份证图片</th>
        <th>姓名</th>
        <th>账号/手机号</th>
        <th>身份证</th>
        <th colspan="5">密码</th>
        <th>审核人员</th>
        <th>审核时间</th>
        <th>活跃时长</th>
        <th>最近登录</th>
      </tr>

      <tr>
        <td rowspan="2"><img
            v-bind:src="worker.worker_id_card_photo"
            alt=""
          ></td>
        <td rowspan="2">{{worker.worker_name}}</td>
        <td rowspan="2">{{worker.worker_phone}}</td>
        <td rowspan="2">{{worker.worker_id_card_num}}</td>
        <td>登录</td>
        <td>店长</td>
        <td>财务</td>
        <td>库存</td>
        <td>经理</td>
        <td rowspan="2">{{worker.auditor_name}}</td>
        <td rowspan="2">{{worker.new_time}}</td>
        <td rowspan="2">{{worker.activity_time}}</td>
        <td
          rowspan="2"
          class="linefeed"
        >{{worker.fresh_time}}</td>
      </tr>
      <tr>
        <td>{{worker.worker_login_pw}}</td>
        <td>{{worker.worker_master_pw}}</td>
        <td>{{worker.worker_finance_pw}}</td>
        <td>{{worker.worker_saving_pw}}</td>
        <td>{{worker.worker_manager_pw}}</td>

      </tr>

    </table>
    <navigator></navigator>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigator from "./Navigator";
import {getDate,getSeconds} from '@/common.js'

export default {
  inject: ["reload"],
  name: "SingleFactory",
  components: {
    navigator: Navigator
  },
  data() {
    return {
      worker_id: "",
      worker: ""
    };
  },
  methods: {},
  created() {
    this.worker_id = this.$store.getters.worker_id;
    const data = {
      token: this.$store.getters.token,
      worker_id: this.worker_id
    };
    function getActivity(date) {
      // if (date >= 3600000) {
      //   return (date / (1000 * 60 * 60)).toFixed(2) + "h";
      // }else if(date >= 60000){
      //   return (date / (1000 * 60)).toFixed(2) + "min";
      // }else{
      //   return (date /1000).toFixed(2) + 's'
      //
      if (date >= 36) {
        return (date / (60 * 60)).toFixed(2) + " h";
      } else {
        return 0+' h';
      }
    }
    this.$axios
      .post("Pcinfo/get_worker_info", JSON.stringify(data))
      .then(res => {
        // console.log(res)
        this.worker = res.data;
        this.worker.new_time = getDate(this.worker.new_time);
        this.worker.fresh_time = getSeconds(this.worker.fresh_time);
        this.worker.activity_time = getActivity(this.worker.activity_time);
      });
  }
};
</script>

<style scoped>
#singleFactory {
  width: 1200px;
  margin: 0 auto;
}
.table {
  width: 1200px;
  margin: 0 auto;
  border-left: 1px solid #00aa99;
  border-top: 1px solid #00aa99;
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
