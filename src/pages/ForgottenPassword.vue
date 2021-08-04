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
                Reset Password
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
            class="q-gutter-md"
            >

            <q-input
            
            filled
            v-model="token"
            label="token"
            v-if="false"

            />


            <q-input
            type="password"
            filled
            v-model="password"
            label="New Password"
            lazy-rules

            />

            <q-input
            type="password"
            filled
            v-model="re_password"
            label="Renew Password"
            lazy-rules

            />
            
            <p v-html="form_validation_message" class="error"></p>


            <div>

              <q-btn type="button" class="fit" color="primary" @click.prevent="send_forgotten_password_form">Change Password</q-btn>

            </div>

          </q-form>
          
        </q-card-section>
        </q-card-section>
          <div class="row justify-center" style="margin:20px;">  
              <q-btn flat color="primary" label="Back to Login" @click="$router.push('/')" />
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

      token: this.$route.params.token,
      password: '',
      re_password: '',
      password_error: false,
      form_validation_message: '',
    }
  },

  methods: {

      send_forgotten_password_form(){        

        if(this.password == ''){
          this.form_validation_message = 'Your New password is empty';        
        }else if(this.re_password == ''){
          this.form_validation_message = 'Your Renew password is empty';
        }else if(this.password != this.re_password){
          this.form_validation_message = 'Your passwords do not match';
        } else {

          this.form_validation_message = '';
          let payload = {
            password: this.password,
            token: this.token
          };
          axios
            .post(process.env.ENV_API_URL + "/api/v1/password_reset/confirm/", payload)
            .then((response) => {

              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Your password has been changed succesfully'
              }); 
              
              this.$router.push('/');

          })
          .catch((error) => {
            this.forgot_password_error = 'Your email is incorret, please check and try again';
          });

        }
      },
      
    },
  };
</script>
<style>
.error {
  margin: 1rem;
  color: #ff4a96;
}

</style>
