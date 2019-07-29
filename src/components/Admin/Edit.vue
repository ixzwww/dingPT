<template>
  <div id="edit">
    <div class="header">
      <div class="close" @click="close">X</div>
      <h3>修改管理员</h3>
    </div>
    <form @submit.prevent="update">
      <div class="form">
        <div class="form-group">
          <label>姓名：</label>
          <input type="text" placeholder="中文或英文" v-model="editData.user_name">
        </div>
        <div class="form-group">
          <label>账号/手机号：</label>
          <input type="text" placeholder="手机号" v-model="editData.user_phone">
        </div>
        <div class="form-group">
          <label>身份证号码：</label>
          <input type="text" placeholder="身份证号码" v-model="editData.user_id_card_num">
        </div>
        <div class="form-group">
          <label>密码：</label>
          <input type="text" placeholder="英文加数字，最低6位" v-model="editData.user_login_pw">
        </div>
        <div class="form-img">
          <label for="file">更改图片</label>

          <div id="img-container">
            <img :src="src" alt>
          </div>
          <input type="file" id="file" @change="getFile">
        </div>
        <div class="identity">
          <span>账号身份：管理员</span>
        </div>

        <button type="submit" class="btn">确认修改</button>
      </div>
    </form>
  </div>
</template>

<script>


export default {
  inject: ["reload","mask"], //项目刷新不白屏
  name: "edit",

  data() {
    return {
      src: "",
      editData: {}
    };
  },
  methods: {
    update() {
      let image = document.getElementById("file").files[0];
     
      let token = this.$store.getters.token;
      let user_name = this.editData.user_name;
      let user_phone = this.editData.user_phone;
      let user_id_card_num = this.editData.user_id_card_num;
      let user_login_pw = this.editData.user_login_pw;
      let user_id = this.editData.user_id;
      let params = new FormData(); //创建一个form对象
      if (image) {
        if (image.type.indexOf("image/") == -1) {
          alert("请上传图片");
          return;
        } else {
          params.append("file", image);
        }
      }

      const user_nameRex = /^[\u4E00-\u9FA5A-Za-z]+$/;
      const user_phoneRex = /^\d{11}$/;
      const user_id_card_numRex = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      const user_login_pwRex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/;
      if (
        !!!user_phone ||
        user_phone === "" ||
        !!!user_phoneRex.test(user_phone)
      ) {
        alert("请输入正确的手机号码");
      } else if (
        !!!user_id_card_num ||
        user_id_card_num === "" ||
        !!!user_id_card_numRex.test(user_id_card_num)
      ) {
        alert("请输入正确的身份证号码");
      } else if (
        !!!user_login_pw ||
        user_login_pw === "" ||
        !!!user_login_pwRex.test(user_login_pw)
      ) {
        alert("密码必须为英文和数字，最低6位");
      } else if (
        !!!user_name ||
        user_name === "" ||
        !!!user_nameRex.test(user_name)
      ) {
        alert("姓名只能输入中文和英文");
      } else{
        params.append("token", token); //append 向form表单添加数据
        params.append("user_name", user_name); //append 向form表单添加数据
        params.append("user_phone", user_phone); //append 向form表单添加数据
        params.append("user_id_card_num", user_id_card_num); //append 向form表单添加数据
        params.append("user_login_pw", user_login_pw); //append 向form表单添加数据
        params.append("user_id", user_id);
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        //20190331/88bd3362f68a363e595645b964f39d60.png
        // const data = {
        //   'token' : this.$store.getters.token,
        //   'user_id' : this.editData.user_id,
        //   'user_name' : this.editData.user_name,
        //   'user_phone' : this.editData.user_phone,
        //   'user_id_card_num' : this.editData.user_id_card_num,
        //   'user_login_pw' : this.editData.user_login_pw,
        // }
        this.$axios
          .post("Admin/update_manager_info", params, config)
          .then(res => {
            if (res.data.status == 1) {
              var editPage = document.getElementById("edit");
              editPage.style.display = "none";
              alert("修改成功");
              this.reload(); //项目刷新不白屏
              this.mask();

            } else if (res.data.errorCode == 10000) {
              alert("修改值非法");
            } else {
              alert("服务器错误");
            }
          });
      }
    },
    getEditData(manager) {
      this.originalData = manager;
      this.editData.user_id = manager.user_id;
      this.editData.user_name = manager.user_name;
      this.editData.user_phone = manager.user_phone;
      this.editData.user_id_card_num = manager.user_id_card_num;
      this.editData.user_login_pw = manager.user_login_pw;
      this.src = manager.user_id_card_photo;
    },
    getFile(e) {
      let _this = this;
      var files = e.target.files[0];
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.src = this.result;
      };
    },
    close() {
      this.mask();

      var editPage = document.getElementById("edit");
      editPage.style.display = "none";
    }
  }
};
</script>

<style>
#edit .header {
  width: 100%;
  background-color: #00cc99;
  margin-bottom: 20px;
}
#edit h3 {
  width: 100px;
  margin: 0 auto;
  padding: 10px 0;
  font-weight: 400;
  color: aliceblue;
}
#edit .close {
  float: right;
  color: aliceblue;
  height: 16px;
  line-height: 16px;
  padding: 5px;
}
#edit .close:hover {
  cursor: pointer;
}
#edit .form {
  width: 100%;
  text-align: right;
}

#edit .form-group {
  margin: 0 auto;
  width: 300px;
}

#edit .form-group input {
  width: 190px;
  height: 25px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
}
#edit .form-group input:focus {
  box-shadow: 0px 0px 10px #00cc99;
  border: 1px #00cc99 solid;
}

#edit .identity {
  margin: 15px auto;
  width: 253px;
  text-align: left;
  /* margin-bottom: ; */
}

#edit .form-img {
  width: 400px;
  margin: 0 auto;
}

#edit #img-container {
  border: 1px solid black;
  width: 280px;
  height: 150px;
  margin: 5px auto;
}
#edit #img-container img {
  display: block;
  width: 220px;
  height: 130px;
  margin: auto;
  margin-top: 10px;
}

#edit .form-img label {
  height: 25px;
  line-height: 25px;
  width: 100px;
  display: block;
  border-radius: 2px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  background-color: #00cc99;
  margin-left: 60px;
}
#edit .form-img label:hover {
  cursor: pointer;
}
#edit .form-img input[type="file"] {
  display: none;
  z-index: 10;
  width: 120px;
  font-size: 0;
  height: 30px;
}

#edit .btn {
  display: block;
  width: 150px;
  text-align: center;
  height: 30px;
  background: #00cc99;
  color: #fff;
  border: 0;
  margin: 0 auto;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 400px;
}
#edit .btn:hover {
  cursor: pointer;
}
</style>
