<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
            class="q-gutter-md"
            >
            <q-input
            filled
            v-model="username"
            label="Username"
            lazy-rules
            />

            <q-input
            type="password"
            filled
            v-model="password"
            label="Password"
            lazy-rules

            />

            <div class="q-gutter-sm">
              <q-checkbox v-model="remember" label="Remember" />
            </div>


            <q-card-section>
              <div class="text-center q-pa-md q-gutter-md">
                <q-btn round color="indigo-7">
                  <q-icon name="fab fa-facebook-f" size="1.2rem" />
                </q-btn>
                <q-btn round color="red-8">
                  <q-icon name="fab fa-google-plus-g" size="1.2rem" />
                </q-btn>
                <q-btn round color="light-blue-5">
                  <q-icon name="fab fa-twitter" size="1.2rem" />
                </q-btn>
              </div>
            </q-card-section>

            <div>

              <p v-if="error" class="error">Email or Password is incorrect.</p>

              <q-btn type="button" class="fit" color="primary" @click.prevent="authenticate">Login</q-btn>

            </div>

          </q-form>
            <div class="row justify-center" style="margin:20px;">  
          <q-btn flat color="primary" label="Forgot your password?" />
           </div>
        </q-card-section>

      </q-card>

    </q-page>
  </q-page-container>

</q-layout>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      password: '',
      accept: false,

      remember: false,
      error: false,
    }
  },
  methods: {
    authenticate () {
      const payload = {
        username: this.username,
        password: this.password,
        error: false

      }

      console.log("Pasoooooooooooo");
      console.log(payload);
      console.log(this.$store.state.endpoints.obtainJWT);

      axios.post(this.$store.state.endpoints.obtainJWT, payload)
      .then((response) => {
        
        console.log("Pasoooooooooooo");
        console.log(payload);
        console.log(response);
        console.log(this.$store);
        //console.log(this.$store.state);
        //console.log(this.$store.state.endpoints);
        //console.log(this.$store.state.endpoints.obtainJWT);

        this.$store.commit('updateToken', response.data.token)
          // get and set auth user
          const base = {
            baseURL: this.$store.state.endpoints.baseUrl,
            headers: {
            // Set your Authorization to 'JWT', not Bearer!!!
            Authorization: 'JWT' + ${this.$store.state.jwt},
            'Content-Type': 'application/json'
          },
          xhrFields: {
            withCredentials: true
          }
        }

        this.$router.push({name: 'dashboard'})
          // Even though the authentication returned a user object that can be
          // decoded, we fetch it again. This way we aren't super dependant on
          // JWT and can plug in something else.
          /*
          const axiosInstance = axios.create(base)
          axiosInstance({
            url: "http://127.0.0.1:8000/api/v1/auth-jwt/",
            method: "post",
            params: {}
          })
            .then((response) => {
              this.$store.commit("setAuthUser",
                {authUser: response.data, isAuthenticated: true}
              )
              this.$router.push({name: 'Home'})
            })
            */

          })
      .catch((error) => {

        this.error = true;

        console.log("entroooooo");
        console.log(error);
          // console.debug(error);
          // console.dir(error);
          console.log("salioooooo");
        })
    }
  }
}
</script>
<style>
.error {
  margin: 1rem;
  color: #ff4a96;
}

.bg-image {
 background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
