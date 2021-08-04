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
          <q-card-section v-if="login_form_display">
            <q-form
            class="q-gutter-md"
            >
            <q-input
            filled
            v-model="username"
            label="Username"
            lazy-rules
            />
            <p v-if="username_error" class="error">Email is empty.</p>

            <q-input
            type="password"
            filled
            v-model="password"
            label="Password"
            lazy-rules

            />
            <p v-if="password_error" class="error">Password is empty.</p>

            <div class="q-gutter-sm">
              <q-checkbox 
              v-model="remember" 
              label="Remember" 
              />
            </div>

            <p v-if="auth_error" class="error">Authentication error, pleases check your info.</p>


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

              <q-btn type="button" class="fit" color="primary" @click.prevent="authenticate">Login</q-btn>

            </div>

          </q-form>
          <div class="row justify-center" style="margin:20px;">  
            <q-btn flat color="primary" label="Forgot your password?" @click="toggle" />
          </div>
        </q-card-section>


        <q-card-section v-if="forgot_password_display">
            <q-form
            class="q-gutter-md"
            >
            <q-input
            filled
            v-model="username"
            label="Username"
            lazy-rules
            />
            <p v-if="username_error" class="error">Email is empty.</p>
            <div>
              <q-btn type="button" class="fit" color="primary" @click.prevent="password_recovery">Send request</q-btn>
            </div>
            </q-form>
            <div class="row justify-center" style="margin:20px;">  
              <q-btn flat color="primary" label="Back to Login"  @click="toggle" />
            </div>

          
        </q-card-section>

      </q-card>


    </q-page>
  </q-page-container>

</q-layout>

</template>

<script>
import axios from 'axios'
import { Base64 } from 'js-base64';

export default {

  /* Ciclo de vida del componente */
  mounted() {
    // this.form es uno de los códigos fuente del cuadro de inicio de sesión en el marco de la interfaz de usuario, que puede ignorarse al estudiar el código
    //this.form = this.$form.createForm(this, { props: { name: 'normal_login' } });
    
    this.initForm();
  },
  data () {
    return {
      username: '',
      password: '',
      accept: false,

      remember: false,
      auth_error: false,
      username_error: false,
      password_error: false,
      forgot_password_display: false,
      login_form_display: true,
    }
  },

  methods: {

      password_recovery() {

        console.log("WWWWWWWWWWWWWWWW");
        axios
          .post("http://localhost:8000/", payload)
          .then((response) => {
            
            this.$store.state.isAuthenticated = true;
            this.$store.state.jwt = response.data.token;

            localStorage.setItem('auth_token', response.data.token);

            if(this.remember == true){

              this.setCookie("username", this.username, 30);
              const psd = Base64.encode(this.password);
              this.setCookie('psd', psd, 30);

            }else{

              this.setCookie('username','', 0);
              this.setCookie('psd', '', 0);

            }

            this.$router.push({ name: "dashboard" });
            

        })
        .catch((error) => {
          
          this.auth_error = true;

        });



      },


      authenticate() {

        this.username_error = false
        this.password_error = false
        this.auth_error = false

        if(this.username == "" || this.password == "" ){

            if(this.username == "") this.username_error = true
            if(this.password == "") this.password_error = true

        }else{

          const payload = {
            username: this.username,
            password: this.password,
          };

          axios
            .post(this.$store.state.endpoints.obtainJWT, payload)
            .then((response) => {
              
              this.$store.state.isAuthenticated = true;
              this.$store.state.jwt = response.data.token;

              localStorage.setItem('auth_token', response.data.token);

              if(this.remember == true){

                this.setCookie("username", this.username, 30);
                const psd = Base64.encode(this.password);
                this.setCookie('psd', psd, 30);

              }else{

                this.setCookie('username','', 0);
                this.setCookie('psd', '', 0);

              }

              this.$router.push({ name: "dashboard" });
              

          })
          .catch((error) => {
            
            this.auth_error = true;

          });

        }

      },

      // Inicializa los datos del formulario cuando se crea el componente
      initForm(){          
          const username = this.getCookie('username');
          const psd = this.getCookie('psd');
          if( username && psd ){
              this.username = username;
              this.password = psd;
              this.remember = true;
          }
      },

      // establecer cookie
      setCookie(cName, value, expireDays){
          let exDate = new Date();
          exDate = exDate.setDate(exDate.getDate() + expireDays);
          document.cookie = cName + '='
              + value
              + ((expireDays === undefined) ? '' : ';expires=' + new Date(exDate).toUTCString())
      },

      // Obtener cookie
      getCookie(key){
        if( document.cookie.length > 0 ){
            let start = document.cookie.indexOf(key + '=');
            if( start !== -1 ){
                start = start + key.length + 1;
                let end = document.cookie.indexOf(';', start);

                if( end === -1 ){
                    end = document.cookie.length;
                    return Base64.decode(document.cookie.substring(start, end));
                } else{
                    return document.cookie.substring(start, end);
                }
            }
        }
        return ''
      },

      toggle () {
        this.forgot_password_display = !this.forgot_password_display
        this.login_form_display = !this.login_form_display
      }

    },
  };
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
