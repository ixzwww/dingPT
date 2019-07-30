<template>
  <div class="bg">
    <div class="login">
      <span class="header">用户登录</span>
      <form
        action=""
        @submit.prevent="login"
      >
        <div class="input">
          <label for="id">账号</label>
          <input
            type="text"
            v-model.trim="id"
            placeholder="账号"
          >
        </div>
        <div class="input last">
          <label for="password">密码</label>
          <input
            type="password"
            v-model.trim="password"
            placeholder="密码"
          >
        </div>
        <div class="error">
          <span v-show="isError">{{remindMessage}}</span>
        </div>
        <button class="loginBtn">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      password: "",
      isError: false,
      remindMessage: ""
    };
  },
  beforeRouteEnter: (to, from, next) => {
    // 
    // if (from.name) {
    //   if (confirm("确定要退出吗？")) {
    //     next(vm => vm.$store.dispatch("setUser", ""));
    //   }
    // } else {
    //   next(vm => vm.$store.dispatch("setUser", ""));
    // }
    next(vm => vm.$store.dispatch("setUser", ""));

  },
  methods: {
    login() {
      let Regx = /^[A-Za-z0-9]*$/;
      if (this.id && this.password) {
        if (Regx.test(this.id) && Regx.test(this.password)) {
          this.isError = false;
          this.remindMessage = "";
          const data = {
            user_phone: this.id,
            user_login_pw: this.password
          };
          this.$axios
            .post("Login/get_token", JSON.stringify(data))
            .then(res => {
              if (res.data.status == 0) {
                this.isError = true;
                this.remindMessage = "账号或密码错误";
                this.password = "";
              } else if (res.data.status == 1) {
                this.$store.commit("userStatus", res.data);
                if (res.data.identity == "admin") {
                  this.$router.push({ name: "homeLink" });
                } else if (res.data.identity == "manager") {
                  this.$router.push({ name: "managerLink" });
                } else{
                  this.isError = true;
                  this.remindMessage = "账号或密码错误";
                  this.password = "";
                }
              }
            });
        } else {
          this.isError = true;
          this.remindMessage = "非法账号或密码";
        }
      } else {
        this.isError = true;
        this.remindMessage = "账号或密码不能为空";
      }
    }
  }
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100vh;
  background-image: url(../assets/bg.jpg);
  background-size: 100% 100%;
  position: relative;
}
@media screen and (max-width: 960px) {
  .bg{
    width:100vh;
    
  }
}
.login {
  width: 400px;
  height: 320px;
  left: 50%;
  top: 50%;
  position: absolute;
  margin-left: -200px;
  margin-top: -160px;
  border: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  
}
.header {
  display: block;
  width: 200px;
  margin: 0 auto;
  text-align: center;
  padding: 10px 0;
  font-size: 25px;
  font-weight: 400;
  color: #00cc99;
  margin-bottom: 30px;
}

.input {
  width: 340px;
  height: 50px;
  margin: 0 auto;
  font-size: 18px;
  margin-bottom: 20px;
}
.last {
  margin-bottom: 0;
}
.input input {
  width: 250px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: 0 10px;
  outline: none;
}
.input input:focus {
  box-shadow: 0px 0px 10px #00cc99;
  border: 1px #00cc99 solid;
}
.loginBtn {
  display: block;
  width: 280px;
  text-align: center;
  height: 40px;
  background: #00cc99;
  color: #fff;
  border: 0;
  margin: 0 auto;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500px;
}
.loginBtn:hover {
  cursor: pointer;
}
.error {
  width: 200px;
  height: 20px;
  color: red;
  float: right;
  margin-bottom: 10px;
  margin-right: 70px;
  text-align: right;
}
.remind {
  position: absolute;
  width: 200px;
  left: 50%;
  bottom: 5%;
  height: 30px;
  text-align: center;
  margin-left: -100px;
}
.remind a {
  text-decoration: underline;
  color: #00cc99;
}
</style>
