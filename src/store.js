import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: ''
  },
  mutations: {
    FETCH_USERS(state, data){
      state.users = data
    }
  },
  actions: {
    fetchUsers({commit}, {self}){
      axios
          .get('http://localhost:3000/users')
          .then((response) => {
            console.log(response.data)
                commit("FETCH_USERS", response.data)
              }
          )
          .catch(error => {console.log(error)})
    }
  },
  getters: {
    users: state => {
      return state.users;
    },
  }
})
