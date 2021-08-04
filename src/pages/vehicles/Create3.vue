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
            id="nickname"
            v-model="vehicle.nickname"
            label="Nickname *"
            hint="Unit 1"
            maxlength="50"
            lazy-rules
            :rules="[val => !!val || 'Nickname is required.']"
          />

          <q-select
            filled
            clearable
            id="vehicle_type"
            v-model="vehicle.type.model"
            label="Vehicle Type *"
            :options="vehicle_type"
            behavior="menu"
            lazy-rules
            :rules="[ val => val && val != null || 'Vehicle Type is required.']"
          />

          <q-select
            filled
            clearable
            id="vehicle_category"
            v-model="vehicle.category.model"
            label="Vehicle Category *"
            :options="vehicle_category"
            behavior="menu"
            lazy-rules
            :rules="[ val => val && val != null || 'Vehicle Category is required.']"
          />

          <q-input
            filled
            clearable
            id="model"
            v-model="vehicle.model"
            label="Model *"
            hint="XS-200"
            maxlength="20"
          />

          <q-input
            filled
            clearable
            id="registration_number"
            v-model="vehicle.registration_number"
            label="Registation Number"
            hint="AUIHT204321ZD"
            maxlength="20"
          />

          <q-input
            filled
            clearable
            id="serie"
            v-model="vehicle.serie"
            label="Serie"
            hint="XS-200"
            maxlength="50"
          />

          <q-input
            filled
            clearable
            id="manufacturing_year"
            type="number"
            v-model="vehicle.manufacturing_year"
            label="Manufacturing Year"
            hint="2020"
            min="1900"
            max="2021"
          />

          <q-select
            filled
            clearable
            id="engine_type"
            v-model="vehicle.engine_type.model"
            label="Engine Type *"
            :options="vehicle_engine_type"
          />

          <q-input
            filled
            clearable
            id="engine_model"
            v-model="vehicle.engine_model"
            label="Engine Model"
            hint="YM303"
            maxlength="20"
          />

          <q-select
            filled
            clearable
            v-model="vehicle.fuel_type.model"
            label="Fuel Type *"
            :options="vehicle_fuel_type"
          />

          <q-input
            filled
            clearable
            id="fuel_capacity"
            type="number"
            v-model="vehicle.fuel_capacity"
            label="Fuel Capacity"
            hint="70 Ltrs."
            min="0"
            max="150"
            
          />

          <q-input
            filled
            clearable
            id="fuel_autonomy"
            type="number"
            v-model="vehicle.fuel_autonomy"
            label="Fuel Autonomy"
            hint="700 Km."
            min="0"
            max="1000"
            
          />

          <q-input
            filled
            clearable
            id="number_seats"
            type="number"
            v-model="vehicle.number_seats"
            label="Number of Seats"
            hint="5 Seats."
            min="0"
            max="600"
            
          />

          <q-input
            filled
            id="description"
            type="textarea"
            v-model="vehicle.description"
            label="Description"
            hint="Description is optional"
          />

          <q-toggle
            :false-value="false"
            :label="`Status is ${vehicle.status}`"
            :true-value="true"
            color="red"
            v-model="vehicle.status"
          />

          <q-select
            filled
            clearable
            id="vehicle_device"
            v-model="vehicle.device.model"
            label="Device *"
            :options="vehicle_device"
            behavior="menu"
            lazy-rules
            :rules="[val => !!val || 'Device is required.']"
          />

          <div class="q-mt-md">
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="secundary" flat class="q-ml-sm" />
            <q-btn label="Cancel" type="button" color="red" flat class="q-ml-sm" :to="{name: 'vehicles_list'}" />
          </div>
        </q-form>
      </div>

    </q-card-section>
  </q-card>
</q-page>
</template>


<script>

import axios from 'axios';
import '../../router/axiosInterceptor';

export default {
  data() {
    return {
      vehicle_type: [], 
      vehicle_category: [],
      vehicle_engine_type: [],
      vehicle_fuel_type: [],
      vehicle_device: [],
      vehicle: {
        nickname: "",
        type:{
          model: this.vehicle_type,
        },
        category:{
          model: this.vehicle_category,
        },
        engine_type:{
          model: this.vehicle_engine_type,
        },
        fuel_type:{
          model: this.vehicle_engine_type,
        },
        description: "",
        device:{
          model: this.vehicle_device,
        },
        status: false,
        
      },
      vehicle2: {
        nickname: "",
        type: "",
        category: "",
        model: "",
        serie: "",
        registration_number: "",
        manufacturing_year: "",
        manufacturer: "",
        engine_type: "",
        engine_model: "",
        fuel_type: "",
        fuel_capacity: "",
        number_seats: "",
        description: "",
        status: "",
        status_dry: "",
        device: "",
        status: false,
        
      },
      submitted: false
    }
  },
  methods: {
    onSubmit () {
      console.log(this.$refs.myForm.$el.nickname);
      console.log(JSON.stringify(this.vehicle));
      console.log(this.data);

      axios
      .post('http://127.0.0.1:8000/api/v1/vehicles/',
        JSON.stringify(this.vehicle)
        )
      .then(
        response => {
          // this.$router.push('/');
          console.log(response);
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          }); 

        }), 
        (error) => {
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
      this.vehicle.name = null
      this.vehicle.currency.model = null
      this.vehicle.description = null
      this.vehicle.amount = null
    },
  },
  mounted () {

     axios
      .options('http://127.0.0.1:8000/api/v1/vehicles/')
      .then(response => {
        this.vehicle_type = choicesOptionsParser(response.data.actions.POST.type.choices);
        this.vehicle_category = choicesOptionsParser(response.data.actions.POST.category.choices);
        this.vehicle_engine_type = choicesOptionsParser(response.data.actions.POST.engine_type.choices);
        this.vehicle_fuel_type = choicesOptionsParser(response.data.actions.POST.fuel_type.choices);
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false);

    /*  

    axios
      .get('http://127.0.0.1:8000/api/v1/devices/')
      .then(response => {
        let options = response.data.results;
        let results = []
        for(let i=0; i<options.length; i++){
          let option = options[i];
          results.push({ label: option["device_imei"], value: option["id"] });
        }
        this.vehicle_device = results
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false);
    */




   },
}

function choicesOptionsParser(options) {
  let results = []
  for(let i=0; i< options.length; i++){
    let option = options[i];
    results.push(option["value"]);
  }
  return results
}

</script>