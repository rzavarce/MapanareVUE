<template>
  <div>
    <button v-on:click='start()'>Start</button>
    <button v-on:click='stop("esta es uan prueba")'>Stop</button>
    xxxxxxxxxxxxx
    <div>{{ message }}</div>
    <v-map :zoom="zoom" :center="center" ref="myMap">
      <v-tilelayer :url="map_server_url" :attribution="attribution"></v-tilelayer>
      <v-icondefault />

      <v-moving-marker
        v-for="l in locations"
        :key="l.id"
        :lat-lng="l.latlng"
        :duration="duration"
        :keep-at-center="keepAtCenter"
        :icon="icon"
        ref="trackMarker"
      >
        
        <v-popup :content="l.text" />

      
      </v-moving-marker>
    </v-map>

  </div>
  

</template>

<script>  
// import L from "leaflet";
import { LMap, LTileLayer, LIconDefault, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import LMovingMarker from 'components/MovingMarker.vue'
import {SimpleMapScreenshoter} from 'leaflet-simple-map-screenshoter'

  
import axios from "axios";
import Vue from 'vue';

console.log("XXXXXXXXXXXXXXX");

function rand(n) {
  const max = n + 0.01
  const min = n - 0.01
  return Math.random() * (max - min) + min
}

const locations = []
for (let i = 0; i < 10; i++) {
  locations.push({
    id: i,
    latlng: L.latLng(rand(48.8929425), rand(2.3821873)),
    text: 'Moving Marker #' + i,
  })
}

const icon = L.icon({
  iconUrl:
    'https://s3-eu-west-1.amazonaws.com/ct-documents/emails/A-static.png',
  iconSize: [21, 31],
  iconAnchor: [10.5, 31],
  popupAnchor: [4, -25],
})

console.log(locations);


export default {
  name: "MapApp",
  components: {
    "v-map": LMap,
    "v-tilelayer": LTileLayer,
    "v-icondefault": LIconDefault,
    "v-popup": LPopup,
    "v-tooltip": LTooltip,
    "v-moving-marker": LMovingMarker,
  },
  props: {
    duration: { type: Number, default: 2000 },
    keepAtCenter: { type: Boolean, default: false }
  },
  methods: {
    start() {
      console.log("pasooooo");
      this.locations[0].latlng = L.latLng(rand(48.8929425), rand(2.3821873))
      
    },
    stop(data) {
      // console.log(data);
      //console.log(this.$store.state.socket);
      console.log("pasooooo");
      //this.$store.onmessage = (data) => console.log(data)
      //this.$store.dispatch('sendMessage', data);

      //this.message = 'Hi How Are';

      this.$store.dispatch('sendMessage', data);
      console.log("sending position by websockets" + this.message)

      /*
      var lat = this.$store.state.socket.message.geometry.coordinates[0]
      var lon = this.$store.state.socket.message.geometry.coordinates[1]

      this.message = lat + " - " + lon;

      this.locations[0].latlng = L.latLng(lat, lon)
      */

    },
    messageReceived: function(raw_message) {
      //var p = this.$store.state.message

      console.log("XXXXXXXXXXXXXXX")
      
    },

  },
  mounted(){

    console.log("XXXXXXXXXXXXXXX");
    // this.message = this.$store.state.socket.message
    this.$options.sockets.onmessage = (message) => {
      var data = JSON.parse(message.data)
      //console.log("2222222222222222");
      //console.log(data)
      //console.log(data.geometry)
      //console.log(this.$store.state.socket.message.geometry.coordinates[0])
      //console.log(this.$store.state.socket.message.geometry.coordinates[1])


      // var lat = this.$store.state.socket.message.geometry.coordinates[0]
      // var lon = this.$store.state.socket.message.geometry.coordinates[1]
      var lat = data.geometry.coordinates[0]
      var lon = data.geometry.coordinates[1]
      this.message = lat + " - " + lon;

      this.locations[0].latlng = L.latLng(lat, lon)
      
      console.log("sending position by websockets" + this.message)
      
    }

  },
  data() {
    return {
      map: {},
      locations,
      icon,
      zoom: 12,
      center: L.latLng(48.8929425, 2.3821873),
      map_server_url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      interval: null,
      message: null

    };
  },
  watch: {
    duration: {
      handler (value, oldValue) {
        if (value !== oldValue) {
          clearInterval(this.interval)
          const setRandomLatLng = () => {
            this.locations.forEach((location) => {
              location.latlng = L.latLng(rand(48.8929425), rand(2.3821873))
            })
          }
          /*
          this.interval = setInterval(() => {
            setRandomLatLng()
          }, value)
          */

          //setRandomLatLng()
        }
      },
      immediate: true
    },
  }
};
</script>

<style scoped>
@import "https://unpkg.com/leaflet@1.4.0/dist/leaflet.css";

.leaflet-container {
  height: 95vh;
}
</style>
