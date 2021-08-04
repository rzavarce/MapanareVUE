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
            clearable
            id="device_imei"
            v-model="device.device_imei"
            label="Device Imei *"
            hint="765432101231243"
            mask="###############"
            lazy-rules
            :rules="[val => !!val || 'Device IMEI is required.', val => val.length == 15 || 'Device IMEI must contain 15 digits.']"
          />

          <q-input
            filled
            clearable
            id="sim_phone"
            v-model="device.sim_phone"
            label="SIM Phone *"
            hint="(+34) 901 - 482 - 526"
            mask="(+##) ### - ### - ###"
            lazy-rules
            :rules="[
              val => !!val || 'SIM Phone is required.', 
              val => val.length == 21 || 'SIM Phone must be a phone number valid.'
            ]"
          />

          <q-select
            filled
            clearable
            v-model="device.device_type.model"
            label="Device Type *"
            :options="device_type"
            behavior="menu"
            :rules="[ val => val && val != null || 'Please type something']"
          />

          <q-input
            filled
            id="description"
            type="textarea"
            v-model="device.description"
            label="Description"
            hint="Description is optional"
          />


          <div class="q-mt-md">
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="secundary" flat class="q-ml-sm" />
            <q-btn label="Cancel" type="button" color="red" flat class="q-ml-sm" :to="{name: 'devices_list'}" />
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
      device_type: [
      'GPS_Inside', 'Mobile', 'Arduino',
      ], 
      device: {
        device_imei: "",
        sim_phone: "",
        device_type:{
          model: this.device_type,
        },
        description: "",
        
      },
      submitted: false
    }
  },
  methods: {
    onSubmit () {
      console.log(this.$refs.myForm)
      this.device.currency = this.device.currency.model
      axios
      .post('http://127.0.0.1:8000/api/v1/devices/',
        this.device
        )
      .then(response => {
              // this.$router.push('/');
              console.log(response);
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
      this.device.name = null
      this.device.currency.model = null
      this.device.description = null
      this.device.amount = null
    },


  }
}
</script>