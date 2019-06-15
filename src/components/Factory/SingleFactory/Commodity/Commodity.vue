<template>
  <div id="commodity">
    <!-- key用来重新加载dom -->
    <table
      class="table"
      :key='refreshId'
    >
      <tr>
        <th>种类</th>
        <th>名称</th>
        <th>型号</th>
        <th>价格</th>
        <th>附加费</th>
        <th>库存量</th>
      </tr>

      <template v-for="(kind,kind_key) in commodity_data">
        <tr>
          <td :rowspan='kind.rowspan+1'>{{kind_key}}</td>
        </tr>
        <template
          v-for="(name,name_key) in kind"
          v-if='name_key!="rowspan"'
        >
          <tr>
            <td :rowspan="name.length+1">{{name_key}}</td>
          </tr>
          <template v-for="item in name">
            <tr
              class="type"
              @click="showForm(item.commodity_id)"
              :class="item.commodity_id == commodity_id ? 'active' : ''"
            >
              <td>{{item.type}}</td>
              <td>{{item.good_price}}</td>
              <td>{{item.add_price}}</td>
              <td>{{item.good_inventory}}</td>
            </tr>
          </template>
        </template>

      </template>

    </table>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Commodity",
  data() {
    return {
      commodity_data: {},
      refreshId: +new Date(),
      commodity_id: ""
    };
  },
  created() {
    this.$nextTick(function() {
      const data = {
        token: this.$store.getters.token,
        worker_id: this.$store.getters.worker_id
      };
      this.commodity_id = this.$route.params.commodity_id;
      this.$axios
        .post("Pcinfo/get_commodity", JSON.stringify(data))
        .then(res => {
        console.log(res)
          let resData = res.data.commodity_data.data;
          let good_kind_tempArr = [];
          resData.forEach(ele => {
            good_kind_tempArr.push(ele.good_kind);
          });
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
          let good_kind_arr = good_kind_tempArr.unique();
          let good_name_arr = [];
          good_kind_arr.forEach(kind => {
            this.commodity_data[kind] = {};
            this.commodity_data[kind]["rowspan"] = 0;
            let good_name_tempArr = [];
            resData.forEach(data => {
              if (data.good_kind == kind) {
                good_name_tempArr.push(data.good_name);
              }
            });
            good_name_arr = good_name_tempArr.unique();
            let goodNum = 0;
            let nameNum = 0;
            good_name_arr.forEach(name => {
              this.commodity_data[kind][name] = [];
              resData.forEach(data => {
                if (data.good_name == name && data.good_kind == kind) {
                  this.commodity_data[kind][name].push({
                    type: data.type,
                    good_price: data.good_price,
                    good_inventory: data.good_inventory,
                    commodity_id: data.commodity_id,
                    add_price:data.add_price
                  });
                }
              });
              //rowspan 等于tr数 = 商品数量（可见tr数） + 设置了rowspan的tr数(设置了rowspan的tr会消失 不计入可见tr数)
              goodNum += this.commodity_data[kind][name].length;
              nameNum += 1;
              this.commodity_data[kind]["rowspan"] = goodNum + nameNum;
            });
          });

          // console.log(this.commodity_data)
        
          // good_kind_arr = good_kind_arr.sort();
          // good_name_arr = good_name_arr.sort();
          // console.log(good_kind_arr)
          // console.log(good_name_arr)
          // const firstForm = this.commodity_data[good_kind_arr[0]][good_name_arr[0]][0].commodity_id;
          // this.showForm(firstForm);


          //异步加载数据时间太长会导致数据还未获取，html已经加载完成，v-for获取不到data里的数据,页面也就没有渲染dom出来
          //即使created是在dom挂载前完成，但异步操作看时间，若时间过长还是会在dom挂载完才拿到数据
          //通过对dom绑定key，在异步加载数据成功后改变key，就会强制重新加载dom
          this.refreshId = +new Date();
        });
    });
  },
  methods: {
    showForm(commodity_id) {
      this.$router.push({
        name: "commodityFormLink",
        params: {
          commodity_id: commodity_id
        }
      });
    },
    //获取路由参数高亮
    active() {
      this.commodity_id = this.$route.params.commodity_id;
    }
  },
  watch: {
    $route: "active"
  }
};
</script>

<style scoped>
#commodity {
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
.table .type:hover {
  cursor: pointer;
}
.table .type:hover {
  background-color: #00cc99;
  color: aliceblue;
}
.active {
  background-color: #00cc99;
  color: aliceblue;
}
</style>
