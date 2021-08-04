<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-indigo-8">
          Tree Table
        </div>
        <div class="text-subtitle2">
          A simple Tree Collapsed/Expanded Table
        </div>
      </q-card-section>

      <q-separator></q-separator>


      <q-card-section class="q-pa-none">
        <div class="q-pa-md" style="max-width: 600px">
        <q-form
    ref="myForm"
    @submit="onSubmit"
    @reset="onReset"
    class="q-gutter-md"
    >

    
    <q-input
    filled
    id="name"
    v-model="subscription.name"
    label="Name *"
    hint="Subscription name"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Please type something']"
    />

     <q-select
      filled
      clearable
      v-model="subscription.currency.model"
      label="Currency"
      :options="selectOptions"
      behavior="menu"
      :rules="[ val => val && val != null || 'Please type something']"
    />


    <q-input
    filled
    id="amount"
    type="number"
    v-model="subscription.amount"
    label="Amount *"
    lazy-rules
    :rules="[
    val => val !== null && val !== '' || 'Please type your age',
    val => val > 0 && val < 100 || 'Please type a real age'
    ]"
    />

    <q-input
    filled
    id="description"
    type="textarea"
    v-model="subscription.description"
    label="Description *"
    hint="Description is optional"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Please type something']"
    />


    <div class="q-mt-md">
      <q-btn label="Submit" type="submit" color="primary"/>
      <q-btn label="Reset" type="reset" color="secundary" flat class="q-ml-sm" />
      <q-btn label="Cancel" type="button" color="red" flat class="q-ml-sm" :to="{name: 'form_index'}" />
    </div>
  </q-form>
</div>

      </q-card-section>
    </q-card>
  </q-page>
</template>


<script>

import axios from 'axios';

export default {
  data() {
    return {
      selectOptions: [
            'EUR', 'USD', 'VNZ',
          ], 
      subscription: {
        name: '',
        currency: {
          model: this.currency,
          options: [
            'EUR', 'USD', 'VNZ',
          ]
        },
        amount: '',
        description: '',
      },
      submitted: false
    }
  },

   mounted() {
      axios.get('http://127.0.0.1:8000/api/subscriptions/' + this.$route.params.id)
          .then( response => {
              console.log("Mounnnnnttttt --->>>> ", response.data)
              response.data.currency = {
                model: response.data.currency,
                options: [
                  'EUR', 'USD', 'VNZ',
                ]
              }

              this.subscription = response.data

                 

          });
    },

  methods: {
    onSubmit () {
        this.subscription.currency = this.subscription.currency.model
        axios
          .put(`http://127.0.0.1:8000/api/subscriptions/${this.subscription.id}/`,
              this.subscription
          )
          .then(response => {
              // this.$router.push('/');
              console.log("response --->>> ", response);

              this.subscription.currency = {
                model: response.data.currency,
                options: [
                  'EUR', 'USD', 'VNZ',
                ]
              }

              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Submitted'
              }); 

          }), (error) => {
            console.log(error);
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'You need to accept the license and terms first'
            })
          }
    },

    onReset () {
      this.subscription.name = null
      this.subscription.currency.model = null
      this.subscription.description = null
      this.subscription.amount = null
    },


  }
}
</script>