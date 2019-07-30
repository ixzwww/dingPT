<template>
  <div id="manager">
    <table class="table">
      <tr>
        <th>身份证图片</th>
        <th>姓名</th>
        <th>账号/手机号</th>
        <th>身份证</th>
        <th colspan="5">密码</th>
        <th>审核时间</th>
        <th>到期时间</th>
        <th>操作</th>
      </tr>
      <template v-for="worker in filterworkers" >
        <tr >
          <td rowspan="2"><img
              v-bind:src="worker.user_id_card_photo"
              alt=""
            ></td>
          <td rowspan="2">{{worker.user_name}}</td>
          <td rowspan="2">{{worker.user_phone}}</td>
          <td rowspan="2">{{worker.user_id_card_num}}</td>
          <td>登录</td>
          <td>店长</td>
          <td>财务</td>
          <td>库存</td>
          <td>经理</td>
          <td rowspan="2">{{worker.auditor_time}}</td>
          <td rowspan="2">{{worker.expire_time}}</td>
          <td rowspan="2">
            <span
              class="edit"
              @click="edit(worker)"
            >修改</span>
 
          </td>
        </tr>
        <tr >
          <td>{{worker.user_login_pw}}</td>
          <td>{{worker.user_master_pw}}</td>
          <td>{{worker.user_finance_pw}}</td>
          <td>{{worker.user_saving_pw}}</td>
          <td>{{worker.user_manager_pw}}</td>
        </tr>
      </template>
    </table>

    <edit
      class="edit-wrapper"
      ref='edit'
    ></edit>
    <div
      class="add"
      @click="add"
    >
      <span class="addBtn">+</span>
      <span>添加用户</span>
    </div>
    <add class="edit-wrapper"></add>

  </div>
</template>

<script>
import Edit from "./Edit";
import Add from "./Add";
import {getDate,getSeconds} from '@/common.js'

export default {
  inject: ["mask"], 
  name: "manager",
  components: {
    edit: Edit,
    add: Add
  },
  data() {
    return {
      workerList: [],
      searchTxt: ""
      // editData:{},
    };
  },
  beforeRouteEnter: (to, from, next) => {
    if (
      window.sessionStorage.getItem("isLogin") &&
      window.sessionStorage.getItem("isManager")
    ) {
      next();
    } else {
      alert("你需要登陆");
      next("/");
    }
  },
  created() {
    let token = this.$store.getters.token;
    let data = {
      token: token
    };
    this.$axios
      .post("Manager/get_workers_list", JSON.stringify(data))
      .then(res => {

        this.workerList = JSON.parse(res.data);
        this.workerList.forEach(element => {
          element.expire_time = getDate(element.expire_time)
          element.auditor_time = getDate(element.auditor_time)
        });
      });
  },
  methods: {
    edit(worker) {
      this.mask();
      var editPage = document.getElementById("edit");
      editPage.style.display = "block";
      this.$refs.edit.getEditData(worker);
    },
    add() {
      this.mask();
      var addPage = document.getElementById("add");
      addPage.style.display = "block";
    },
    
  },
  computed: {
    filterworkers: function() {
      return this.workerList.filter(worker => {
        return (
          worker.user_name.match(this.$store.getters.searchTxt) ||
          worker.user_phone.match(this.$store.getters.searchTxt)
        );
      });
    }
  }
};
</script>

<style scoped>
#manager{
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

.edit-wrapper {
  border: #000 1px solid;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  width: 450px;
  position: fixed;
  left: 50%;
  margin-left: -225px;
  top: 50%;
  height: 80%;
  margin-top: -250px;
  background-color: #fff;
  overflow-y:scroll;

}
.edit {
  color: #00cc99;
  text-decoration: underline;
}
.edit:hover {
  cursor: pointer;
}
#edit,
#add {
  display: none;
}

.add {
  width: 150px;
  margin: 10px auto;
  border: #00cc99 2px solid;
  border-radius: 4px;
  color: #00cc99;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.add:hover {
  cursor: pointer;
}
.addBtn {
  font-weight: bold;
}
</style>
