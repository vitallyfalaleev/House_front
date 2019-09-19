<template>
  <v-app>
    <v-app-bar app
               absolute
               color="white"
               elevate-on-scroll>
      <v-toolbar-title  class="headline text-uppercase">
        <span class="font-weight-light">House Keaper</span>
      </v-toolbar-title>
      <v-btn
          text
          to="/">
        <span>Home</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
          text
          to="/login"
          v-if="!isLogin">
        <span>Login</span>
      </v-btn>
      <v-btn
          text
          :to="/profile/ + current_user.id"
          v-if="isLogin">
        <span class="mr-2">{{current_user.id}} profile</span>
      </v-btn>
      <v-btn
          text
          @click="logout"
          v-if="isLogin">
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
    const axios = require('axios');
    export default {
        name: 'App',
        components: {
        },
        data: () => ({
            //
        }),
        methods: {
            logout(){
                axios.delete('http://localhost:3000/logout')
                    .then(localStorage.clear())
                    .then(this.$router.go('/'))
            }
        },
        computed: {
            isLogin(){
                return this.$store.getters.isLogin
            },
            current_user(){
                return this.$store.getters.current_user
            }
        }
    };
</script>
