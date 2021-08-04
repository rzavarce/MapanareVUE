<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>

        <div class="row" style="background-color:white;">
          <div class="col-xs-12 col-sm-6">
            <div class="q-pa-md q-gutter-sm">
          <span class="text-h4 text-indigo-8">Vehicle Detail</span>
          <span class="text-subtitle2">View vehicle detail.</span>
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


      <div class="info_section" style="border-radius: 5px">
        <div class="col-xs-12"  style="padding-bottom: 10px">
          <span class="text-h6">Vehicle Info</span>
        </div>

          <q-card-section class="q-pa-none" >
              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Nickname: </span> {{this.vehicle.nickname}}
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Vehicle Type: </span> {{this.vehicle.type}}
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Vehicle Category:</span> {{this.vehicle.category}}
                </div>
              </div>

              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Model: </span> {{this.vehicle.model}}
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Registation Number: </span> {{this.vehicle.registration_number}}
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Serie:</span> {{this.vehicle.serie}}
                </div>
              </div>

              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Manufacturing Year: </span> {{this.vehicle.manufacturing_year}}
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Engine Type: </span> {{this.vehicle.engine_type}}
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Engine Model:</span> {{this.vehicle.engine_model}}
                </div>
              </div>

              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Fuel Type: </span> {{this.vehicle.fuel_type}}
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Fuel Capacity: </span> {{this.vehicle.fuel_capacity}}
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Fuel Autonomy:</span> {{this.vehicle.fuel_autonomy}}
                </div>
              </div>

              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Number of Seats: </span> {{this.vehicle.number_seats}}
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Description: </span> {{this.vehicle.description}}
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Status:</span> {{this.vehicle.status}}
                </div>
              </div>

          </q-card-section>
              
      </div>

      <div class="info_section" style="border-radius: 5px">
        <div class="col-xs-12"  style="padding-bottom: 10px">
          <span class="text-h6">Device Info</span>
        </div>

          <q-card-section class="q-pa-none" :class="show">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-4">
                <span class="text-h6">Device IMEI: </span> {{this.vehicle.device.device_imei}}
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <span class="text-h6">Device Description: </span> {{this.vehicle.device.description}}
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <span class="text-h6">Device Status:</span> {{this.vehicle.device.status}}
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-4">
                <span class="text-h6">SIM Phone: </span> {{this.vehicle.device.sim_phone}}
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <span class="text-h6">Device Type: </span> {{this.vehicle.device.type_device}}
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <span class="text-h6">Device Model:</span> {{this.vehicle.device.model_device}}
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pa-none" :class="hidden" >
            <div class="row">
              <div class="col-xs-12">
                <span class="text-h6">Device not found for this vehicle.</span>
              </div>
              
            </div>
          </q-card-section>
      </div>

      <div class="info_section" style="border-radius: 5px">
        <div class="col-xs-12"  style="padding-bottom: 10px">
          <span class="text-h6">Driver Info</span>
        </div>

          <q-card-section class="q-pa-none" >
            <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Driver Nickname: </span> rzavarce
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Driver Name: </span> Roger Zavarce
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4">
                  <span class="text-h6">Driver Status:</span> Activo
                </div>
              </div>
          </q-card-section>
      </div>

    <q-separator></q-separator>
    <div style="padding: 0px 15px 5px 15px">
      <div class="q-mt-md" style="margin:20px;">
        <q-btn label="Edit" icon="create" type="button" color="secundary" flat class="q-ml-sm" :to="{name: 'vehicles_edit'}"/>
        <q-btn label="Cancel" icon="cancel_schedule_send" type="button" color="red" flat class="q-ml-sm" :to="{name: 'vehicles_list'}" />
      </div>
    </div>
  </q-form>

  </q-card>
</q-page>
</template>
<style lang="sass" scoped>

.info_section
  padding: 20px
  border: solid 1px grey
  margin: 20px

.row-title
  padding:20px


.row
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  
</style>
<script>

import axios from 'axios';

export default {
  data() {
    return {
      vehicles_history: [],
      vehicle: {},
      hidden: "hidden",
      show: ""
    }
  },

  mounted () {

    axios
    .get('http://127.0.0.1:8000/api/v1/vehicles/' + this.$route.params.id)
    .then(response => {

      this.vehicle = response.data

      if (this.vehicle.device == null){
        this.hidden = "";
        this.show = "hidden"
        this.vehicle.device = {}

      }

    })
    .catch(error => {
      console.log(error)
      this.errored = true
    })
    .finally(() => this.loading = false);

  },
  methods: {

  },
    
}


</script>

