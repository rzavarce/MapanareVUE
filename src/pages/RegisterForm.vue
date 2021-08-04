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
                Register User
              </div>
            </div>
          </q-card-section>
          <q-card-section v-if="register_form_display">
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
            filled
            v-model="email"
            label="Email"
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

            <q-input
            filled
            v-model="first_name"
            label="First name"
            lazy-rules
            />
            
            <q-input
            filled
            v-model="last_name"
            label="Last name"
            lazy-rules
            />
            <p v-html="form_validation_message" class="error"></p>


            <div>

              <q-btn type="button" class="fit" color="primary" @click.prevent="send_register_form">Create Account</q-btn>

            </div>

          </q-form>
        </q-card-section>
        <q-card-section v-if="!register_form_display">
          <q-banner class="bg-primary text-white">
              Account has been created, please check your inbox mail to activate.</p>
          </q-banner>
        </q-card-section>
        </q-card-section>
          <div class="row justify-center" style="margin:0px 20px 20px 20px;">  
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
  data () {
    return {

      username: '',
      email: '',
      password: '',
      re_password: '',
      first_name: '',
      last_name: '',
      password_error: false,
      register_form_display: true,
      form_validation_message: '',
    }
  },

  methods: {

      send_register_form(){


        if(this.username == ''){
          this.form_validation_message = 'Your username is empty';        
        }else if(this.email == ''){
          this.form_validation_message = 'Your email is empty';
        }else if(this.password == ''){
          this.form_validation_message = 'Your New password is empty';        
        }else if(this.re_password == ''){
          this.form_validation_message = 'Your Renew password is empty';
        }else if(this.password != this.re_password){
          this.form_validation_message = 'Your passwords do not match';
        } else {
          this.form_validation_message = '';
        
          let payload = {
              "username": this.username,
              "password": this.password,
              "password2": this.password,
              "email": this.email,
              "first_name": this.first_name,
              "last_name": this.last_name
          }

          axios
            .post(process.env.ENV_API_URL + "/api/v1/register/", payload)
            .then((response) => {
              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Your account has been created succesfully'
              }); 
          })
          .catch((error) => {
            this.forgot_password_error = 'Your email is incorret, please check and try again';
          });
          

        }

      },
      
      isValidEmail (val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid email';

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
