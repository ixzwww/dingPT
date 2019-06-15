<template>
  <div id="month">
    <table class="table">
      <tr>
        <th>明细</th>
        <th>订单编号</th>
        <th>本月销量</th>
        <th>已收款</th>
        <th>其他费用</th>
        <th>总欠款</th>
      </tr>
      <tr v-for="finance in financeList">
        <td>{{finance.new_time}}</td>
        <td>{{finance.trade_id}}</td>
        <td>{{finance.consume}}</td>
        <td>{{finance.receipt}}</td>
        <td>{{finance.other_consume}}</td>
        <td>{{finance.debt}}</td>
      </tr>
      <tr>
        <td>总和</td>
        <td></td>
        <td>{{total.total_consume}}</td>
        <td>{{total.total_receipt}}</td>
        <td>{{total.total_other_consume}}</td>
        <td>{{total.total_debt}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Month",
  data() {
    return {
      financeList: [],
      total:{}
    };
  },
  methods: {
    getData() {
      let year = this.$route.params.year_id;
      let month = this.$route.params.month_id;
      let start = `${year}-${month}-01 00:00:00`;
      let end = `${year}-${month + 1}-01 00:00:00`;

      const data = {
        token: this.$store.getters.token,
        worker_id: this.$store.getters.worker_id,
        start_date: new Date(start).getTime() / 1000,
        end_date: new Date(end).getTime() / 1000
      };

      function getDate(date) {
        if (date != 0) {
          var t = new Date(date * 1000);
          return t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate();
        } else {
          return "暂无";
        }
      }

      this.$axios.post("Pcinfo/get_finance", JSON.stringify(data)).then(res => {
        this.financeList = res.data.finance_data.data;
        this.total = res.data.total;
        let debt =[0];
        this.financeList.forEach((element,index) => {
          element.new_time = getDate(element.new_time);
          element.debt = debt[index] + element.consume - element.receipt - element.other_consume;
          debt.push(element.debt);
        });
        this.total.total_debt = debt[debt.length-1]
      });
    }
  },
  created() {
    this.getData();
  },
  watch: {
    $route: "getData"
  }
};
</script>

<style scoped>
#month {
  float: right;
}
.table {
  width: 900px;

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
