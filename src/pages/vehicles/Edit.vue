<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>

        <div class="row" style="background-color:white;">
          <div class="col-xs-12 col-sm-6">
            <div class="q-pa-md q-gutter-sm">
          <span class="text-h4 text-indigo-8">Vehicle Edit</span>
          <span class="text-subtitle2">Edit vehicle detail.</span>
        </div>
          </div>
          <div class="col-xs-12 col-sm-6">
            <div class="q-pa-md q-gutter-sm">
              <q-breadcrumbs class="text-grey" align="right">
                <template v-slot:separator>
                  <q-icon
                    size="1.2em"
                    name="arrow_forward"
                    color="primary"
                  />
                </template>

                <q-breadcrumbs-el label="Dashboard" icon="home" to="/Dashboard" />
                <q-breadcrumbs-el label="Vehicles" icon="commute" to="/Vehicles" />
                <q-breadcrumbs-el label="View" icon="remove_red_eye" />
              </q-breadcrumbs>
            </div>
          </div>

        </div>

      </q-card-section>
      <q-separator></q-separator>

      <q-form
      ref="myForm"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      >

      <div class="row">
        <div class="col-8">
          <q-card-section class="q-pa-none">
            <div class="q-pa-md" style="max-width: 600px">

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
              emit-value
              map-options
              id="vehicle_type"
              v-model="vehicle.type"
              label="Vehicle Type *"
              :options="vehicle_type"
              behavior="menu"
              lazy-rules
              :rules="[ val => val && val != null || 'Vehicle Type is required.']"
              />

              <q-select
              filled
              clearable
              emit-value
              map-options
              id="vehicle_category"
              v-model="vehicle.category"
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
              emit-value
              map-options
              id="engine_type"
              v-model="vehicle.engine_type"
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
              emit-value
              map-options
              v-model="vehicle.fuel_type"
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
              max="1000"

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
              emit-value
              map-options
              id="vehicle_device"
              v-model="vehicle.device"
              label="Device *"
              :options="vehicle_device"
              behavior="menu"              
              />

            </div>

          </q-card-section>

        </div>
        <q-separator vertical inset></q-separator>
        <div class="col">

          <q-card-section class="text-h6 q-pb-none">
            <q-item>
              <q-item-section avatar class="">
                <q-icon color="blue" name="access_time" style="font-size: 2em;"/>
              </q-item-section>

              <q-item-section>
                <div class="text-h6">History Activity</div>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-section style="margin-left:27px;">
            <q-timeline  color="secondary">

              <q-timeline-entry
              v-for="(vehicles_history, index) in vehicles_history"
              :key="index"
              :title="vehicles_history.title"
              :subtitle="vehicles_history.subtitle" :color="vehicles_history.color" :icon="vehicles_history.icon"
              :side="vehicles_history.side"
              >
                
                {{vehicles_history.desc}}
                
              </q-timeline-entry>

            </q-timeline>
          </q-card-section>

        </div>
    </div>
    <q-separator></q-separator>
    <div class="row">
      <div class="q-mt-md" style="margin:20px;">
        <q-btn label="Submit" icon="send" type="submit"  color="primary"/>
        <q-btn label="Reset" icon="restore" type="reset" color="secundary" flat class="q-ml-sm" />
        <q-btn label="Cancel" icon="cancel_schedule_send" type="button" color="red" flat class="q-ml-sm" :to="{name: 'vehicles_list'}" />
      </div>
    </div>
  </q-form>

  </q-card>
</q-page>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      vehicle_type: [], 
      vehicle_category: [],
      vehicle_engine_type: [],
      vehicle_fuel_type: [],
      vehicle_device: [],
      vehicles_history: [],
      vehicle: {
                
      },
      submitted: false
    }
  },

  mounted () {

    axios
    .get('http://127.0.0.1:8000/api/v1/vehicles/form_data/' + this.$route.params.id)
    .then(response => {

      // console.log(response.data);

      this.vehicle_type = choicesOptionsParser(response.data.type_list);
      this.vehicle_category = choicesOptionsParser(response.data.category_list);
      this.vehicle_engine_type = choicesOptionsParser(response.data.engine_list);
      this.vehicle_fuel_type = choicesOptionsParser(response.data.fuel_types_list);

      this.vehicle = response.data.vehicle_data[0]
      console.log(this.vehicle);

      if(this.vehicle.device != null){
        this.vehicle.device = { label: this.vehicle.device["device_imei"], value: this.vehicle.device["id"] }
      }


      let devices_list = response.data.devices_list;
      let results = [];
      let i;
      for(i=0; i<devices_list.length; i++){
        this.vehicle_device.push({ label: devices_list[i]["device_imei"], value: devices_list[i]["id"] });
      }

      let history = response.data.vehicles_history
      for(i=0; i < 1; i++){
        this.vehicles_history.push({
          title: history[i].nickname,
          subtitle: history[i].history_date,
          side: 'left',
          desc: history_types[history[i].history_type],
          color: "red",
          icon: "thumb_up"
        })
      }
      console.log(this.vehicles_history);

    })
    .catch(error => {
      console.log(error)
      this.errored = true
    })
    .finally(() => this.loading = false);

  },
  methods: {
    onSubmit () {
      //console.log(this.$refs.myForm.$el.nickname);
      console.log(JSON.stringify(this.vehicle));
      //console.log(this.data);

      this.$refs.myForm.validate().then(success => {
        if (success) {
          axios
          .put(`http://127.0.0.1:8000/api/v1/vehicles/${this.vehicle.id}/`,
            this.vehicle)
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
        }
        else {
          // oh no, user has filled in
          // at least one invalid value
        }
      })

      
    },

    onReset () {
      console.log('Reseting the form');
      this.vehicle = {
        nickname: "",
        type: null,
        category: null,
        model: "",
        serie: "",
        registration_number: "",
        manufacturing_year: null,
        manufacturer: "",
        engine_type: null,
        engine_model: "",
        fuel_type: null,
        fuel_capacity: null,
        number_seats: null,
        description: "",
        status: "",
        status_dry: null,
        device: null,
        status: false,        
      };
    }
  },
}

function choicesOptionsParser(options) {
  let results = []
  for(let i=0; i< options.length; i++){
    results.push({
      value: options[i][0],
      label: options[i][1],
    });
  }
  return results
}

let history_types = {
  "+": "New register has been added."
}

</script>