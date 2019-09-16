<template>
    <v-container>
        <h3>reg</h3>
        <form @submit.prevent="register">
            <div class="error" v-if="error">{{error}}</div>
            <div class="row">
                <label for="email">email</label>
                <input type="email" v-model="email" id="email"
                       placeholder="email" />
            </div>
            <div class="row">
                <label for="password">password</label>
                <input type="password" v-model="password"
                       id="password" />
            </div>
            <div class="row">
                <label for="password_confirmation">password confirm</label>
                <input type="password" v-model="password_confirmation"
                       id="password_confirmation" />
            </div>
            <button type="submit" >submit</button>
        </form>
    </v-container>
</template>
<script>
    const axios = require('axios');
    export default {
        data(){
            return {
                email: '',
                password: '',
                password_confirmation: '',
                error: ''
            }
        },
        methods: {
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
                    .then(response => this.loginSuccess(response)
                    )
                    .catch(error => this.loginFailed(error))
            },
            loginSuccess (response) {
                this.$router.replace('/')
                console.log(response)
            },
            loginFailed (error) {
                console.log(error)

                this.error = (error.response && error.response.data && error.response.data.error ) || ''
            }
        }
    }
</script>