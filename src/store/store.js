
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {

        isLogin: false,
        isAdmin: false,
        isManager: false,
        token: '',
        searchTxt: '',
        editData: {},
        worker_id: ''
    },
    getters: {
        isLogin: state => { state.isLogin = sessionStorage.getItem("isLogin"); return state.isLogin },
        isAdmin: state => { state.isAdmin = sessionStorage.getItem("isAdmin"); return state.isAdmin },
        token: state => { state.token = sessionStorage.getItem("token"); return state.token },
        // worker_id: state => state.worker_id,
        worker_id: state => { state.worker_id = sessionStorage.getItem("worker_id"); return state.worker_id },
        searchTxt: state => state.searchTxt,
    },
    mutations: {
        setSearchTxt(state, data) {
            state.searchTxt = data;
        },
        userStatus(state, data) {
            if (data.identity) {
                if (data.identity == 'admin') {
                    sessionStorage.setItem("isAdmin", true);
                    state.isAdmin = true;
                } else if (data.identity == 'manager') {
                    sessionStorage.setItem("isManager", true);
                    state.isManager = true;
                }
                sessionStorage.setItem("isLogin", true);
                sessionStorage.setItem("token", data.token);
                state.isLogin = true;
            } else {
                sessionStorage.removeItem("isLogin");
                sessionStorage.removeItem("isManager");
                sessionStorage.removeItem("isAdmin");
                sessionStorage.removeItem("worker_id");
                sessionStorage.removeItem("token");
                state.isLogin = false;
                state.isAdmin = false;
                state.isManager = false;
                state.token = '';
            }
        },
        setWorker_id(state, data) {
            //不可以只设置sessionStorage 否则会导致要刷新页面 this.$store.getters.worker_id才会取到新的值
            //或则直接在组件setItem getItem 跳过VUEX
            state.worker_id = data
            sessionStorage.setItem("worker_id", data);
    
            
        }
    },
    actions: {
        setUser({ commit }, data) {
            commit('userStatus', data)
        },
    }
})