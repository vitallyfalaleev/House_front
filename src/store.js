import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('user-login') || false,
    token: localStorage.getItem('user-token') || '',
    current_user: localStorage.getItem('current_user') || [],
    users: '',
    user: [],
    status: ''
  },
  mutations: {
    FETCH_USERS(state, data){
      state.users = data
    },
    SHOW_USERS(state, data){

      state.user = JSON.stringify(data)
    },
    GET_AUTH(state, data){
      state.authorization = data
    },
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, {data}) {
      state.status = 'success';
      state.isLogin = true;
      state.token = data.token;
      state.current_user = data.user;
    },
    AUTH_ERROR(state) {
      state.status = 'error'
    },
  },
  actions: {
    fetchUsers({commit}, {data}){
      axios
          .get(BASE_URL + '/users',
              {
                headers: {
                  authorization: this.state.token || this.state.token
                }
              })
          .then((response) => {
                commit("FETCH_USERS", response.data)
              }
          )
          .catch(error => {console.log(error)})
    },
    showUser({commit}, {data}){
      axios
          .get(BASE_URL + '/users/' + data.id,
              {
                headers: {
                  authorization: this.state.token || this.state.token
                }
              })
          .then((response) => {
                commit("SHOW_USERS", response.data)
              }
          )
          .catch(error => {console.log(error)})
    },
    getUserAuthorization({commit}, {data}){
      commit("GET_AUTH", data)
    },
    createSession({commit}, {user}){
      commit("AUTH_REQUEST")
      axios
          .post(BASE_URL + '/login',{user})
          .then(response => {
            const token = response.headers.authorization;
            localStorage.setItem('user-token', token);
            localStorage.setItem('user-login', true);
            localStorage.setItem('current_user', JSON.stringify(response.data));
            commit("AUTH_SUCCESS", {data: {token: token, user: response.data}})
          })
          .catch(error => {
            commit("AUTH_ERROR", error)
            localStorage.removeItem('user-token', 'user-login')
          })
    }
  },
  getters: {
    users: state => {
      return state.users;
    },
    user: state => {
      if (typeof(state.user) === 'string'){
        return JSON.parse(state.user)
      }
      else{
        return state.user
      }
    },
    isAuthenticated: state => !!state.token,
    status: state => {
      return state.status
    },
    isLogin: state => {
      return state.isLogin
    },
    current_user: state => {
      if (typeof(state.current_user) === 'string'){
        return JSON.parse(state.current_user)
      }
      else{
        return state.current_user
      }
    }
  }
})
