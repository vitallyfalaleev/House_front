<template>
  <v-container>
    <v-row>
      <v-col :md="6">
        {{user.email}}
      </v-col>
      <v-col :md="6">
        {{user.email}}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        components: {
        },
        created() {
            this.$store.dispatch("showUser", {data: {id: this.$route.params.id}})
        },
        computed: {
            user(){
                return this.$store.getters.user
            }
        }
    };
</script>