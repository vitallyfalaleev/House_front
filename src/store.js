import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('user-login') || false,
    users: '',
    token: localStorage.getItem('user-token') || '',
    status: '',
  },
  mutations: {
    FETCH_USERS(state, data){
      state.users = data
    },

    GET_AUTH(state, data){
      state.authorization = data
    },
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, token) {
      state.status = 'success'
      state.isLogin = true
      state.token = token
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
    getUserAuthorization({commit}, {data}){
      commit("GET_AUTH", data)
    },
    createSession({commit}, {user}){
      commit("AUTH_REQUEST")
      axios
          .post(BASE_URL + '/login',{user})
          .then(response => {
            const token = response.headers.authorization
            localStorage.setItem('user-token', token)
            localStorage.setItem('user-login', true)
            commit("AUTH_SUCCESS", token)
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
    isAuthenticated: state => !!state.token,
    status: state => {
      return state.status
    },
    isLogin: state => {
      return state.isLogin
    }
  }
})
