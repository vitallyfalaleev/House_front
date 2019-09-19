<template>
  <div>
    <transition name="fade">
      <v-alert type="error" v-if="error">{{error}}</v-alert>
      <v-alert type="error" v-if="errors">
        <div v-for="(error, key) in errors"><span style="text-transform: capitalize">{{key}}</span> -  {{error[0]}}</div>
      </v-alert>
    </transition>

    <v-row

        style="height: 300px;"
        align="center"
        justify="center">
      <v-col :md="5">
        <v-card height="350px">
          <v-tabs :grow="true">
            <v-tabs-slider></v-tabs-slider>
            <v-tab key="login">Login</v-tab>
            <v-tab key="registration">Registration</v-tab>
            <v-tab-item key="login">
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                      v-model="log_email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="log_password"
                      label="Password"
                      type="password"
                      :rules="passwordRules"
                      required
                  ></v-text-field>
                  <v-btn
                      color="success"
                      medium
                      :disabled="this.loginBlank()"
                      :loading="this.status === 'loading' ? true : false"
                      type="submit" >submit</v-btn>
                </v-form>
              </v-card-text>
            </v-tab-item>
            <v-tab-item key="registration">
              <v-card-text>
                <v-form @submit.prevent="register">
                  <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="password"
                      label="Password"
                      type="password"
                      :rules="passwordRules"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="password_confirmation"
                      label="Password confirmation"
                      type="password"
                      :rules="passwordRules"
                      required
                  ></v-text-field>
                  <v-btn
                      color="success"
                      medium
                      :disabled="this.registrationBlank()"
                      type="submit" >submit</v-btn>
                </v-form>
              </v-card-text>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "loginform",
        data(){
            return {
                log_email: '',
                log_password: '',
                email: '',
                password: '',
                password_confirmation: '',
                error: '',
                errors: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                passwordRules: [
                    v => !!v || 'Password cant be blank'
                ]
            }
        },
        methods: {
            login () {
                this.$store.dispatch("createSession", {user: {email: this.log_email, password: this.log_password}}).then(() => {
                    console.log(this.status)
                    this.loginSuccess(this.status)
                })
            },
            register () {
                axios.post('http://localhost:3000/signup',
                    {
                        user: {
                            email: this.email,
                            password: this.password,
                            password_confirmation: this.password_confirmation
                        }
                    }
                )
                    .then(response => this.registrationSuccess(response)
                    )
                    .catch(error => this.loginFailed(error))
            },
            loginSuccess(state){
                if (state === "success") {
                    this.$router.push('/')
                }
                else{
                    setTimeout(()=>{
                        this.loginSuccess(this.status)
                    }, 300)
                }
            },
            registrationSuccess(){
                this.$store.dispatch("createSession", {user: {email: this.email, password: this.password}}).then(() => {
                    console.log(this.status)
                    this.loginSuccess(this.status)
                })
            },
            loginFailed (error) {
                if(typeof error.response.data === "string"){
                    this.error = error.response.data
                    this.errors = ''
                }
                else if(typeof error.response.data === "object"){
                    this.errors = error.response.data
                    this.error = ''
                }
                else {
                    this.error = ''
                }
            },
            registrationBlank (){
                return !(this.password !== '' && this.password_confirmation !== '')
            },
            loginBlank (){
                return !(this.log_email !== '' && this.log_password !== '')
            }
        },
        computed: {
            status(){
                return this.$store.getters.status
            }
        }
    }
</script>

<style scoped lang="scss">
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>