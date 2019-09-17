<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title onclick="" class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        to="/login">
        <span class="mr-2">Login</span>
      </v-btn>
      <v-btn
        text
        @click="logout">
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
    }
  }
};
</script>
