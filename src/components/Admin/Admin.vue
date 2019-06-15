<template>
  <div id="admin">
    <table class="table" >
      <tr>
        <th>身份证图片</th>
        <th>姓名</th>
        <th>账号/手机号</th>
        <th>身份证</th>
        <th>密码</th>
        <th>审核人数</th>
        <th>操作</th>
      </tr>
      <tr v-for="manager in filterManagers">
        <td><img v-bind:src="manager.user_id_card_photo" alt=""></td>
        <td>{{manager.user_name}}</td>
        <td>{{manager.user_phone}}</td>
        <td>{{manager.user_id_card_num}}</td>
        <td>{{manager.user_login_pw}}</td>
        <td>{{manager.invite}}</td>
        <td><span class="edit" @click="edit(manager)">修改</span></td>
      </tr>
    </table>
    <edit class="edit-wrapper"  ref='edit'></edit>
    <div class="add" @click="add">
      <span class="addBtn">+</span>
      <span>添加用户</span>
    </div>
    <add  class="edit-wrapper"></add>

  </div>
</template>

<script>
import Edit from './Edit'
import Add from './Add'


export default {
  name: 'admin',
  components:{
    edit : Edit,
    add : Add,
  },
  data(){
    return{
      managerList:[],
      searchTxt:'',
      // editData:{},
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    if(window.sessionStorage.getItem('isLogin')&&window.sessionStorage.getItem('isAdmin')){
      next();
    }else{
      alert('你需要登陆')
      next('/')
    }
  },
  created(){
    
    let token = this.$store.getters.token;
    let data = {
      'token' : token
    }
    this.$axios.post('Admin/get_manager_list',JSON.stringify(data))
    .then(res=>{
      this.managerList = JSON.parse(res.data)
    })
      
  },
  methods:{
    edit(manager){
      var editPage = document.getElementById('edit');
      editPage.style.display = 'block';
      this.$refs.edit.getEditData(manager);

    },
    add(){
    var addPage = document.getElementById('add');
      addPage.style.display = 'block';
    }
  },
  computed:{
    filterManagers:function(){
          return this.managerList.filter((manager)=>{
              return manager.user_name.match(this.$store.getters.searchTxt)||manager.user_phone.match(this.$store.getters.searchTxt);
          })
    }
  },
}
</script>

<style scoped>
#admin{
  width:1200px;
    margin: 0 auto;
}
  .table{
    width:1200px;
    margin: 0 auto;
    border-left: 1px solid #00aa99;
    border-top: 1px solid #00aa99;
    border-collapse:collapse;

  }
  .table td,th{
    height: 30px;
    border-bottom: 1px solid #00aa99;
    border-right: 1px solid #00aa99;
    text-align: center;
    font-size: 17px;
  }
  .table img{
    width:172px;
    height:108px;
    margin-top: 3px ;
  }

  .edit-wrapper{
    border: #000 1px solid;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    width: 450px;
    position: absolute;
    left: 50%;
    margin-left: -225px;
    top: 50%;
    height: 500px;
    margin-top: -250px;
    background-color: #fff;
  }
  .edit{
    color: #00cc99;
    text-decoration: underline;
  }
  .edit:hover{
    cursor: pointer;
  }
  #edit,#add{
    display: none;
  }

  .add{
    width: 150px;
    margin: 10px auto;
    border: #00cc99 2px solid;
    border-radius: 4px;
    color: #00cc99;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  .add:hover{
    cursor: pointer;
  }
  .addBtn{
    font-weight: bold
  }
</style>
