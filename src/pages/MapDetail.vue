<template>
  <div>
    <v-map :zoom="zoom" :center="center" ref="myMap">
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
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
    <button v-on:click='start'>Start</button>
    <button v-on:click='stop("esta es uan prueba")'>Stop</button>
    <div>{{ message }}</div>
  </div>
  

</template>

<script>
// import L from "leaflet";
import { LMap, LTileLayer, LIconDefault, LCircle, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import LMovingMarker from 'components/MovingMarker.vue'
  
import axios from "axios";
import Vue from 'vue';


function rand(n) {
  const max = n + 0.01
  const min = n - 0.01
  return Math.random() * (max - min) + min
}

const locations = []

locations.push({
  id: 0,
  latlng: L.latLng(48.8929425, 2.3821873),
  text: 'Moving Marker # 0',
})


const icon = L.icon({
  iconUrl:
    'marker_pincher2.png',
  shadowUrl: 'aro_shadow.png',
  shadowSize:   [100, 100], 
  shadowAnchor: [50, 60],  
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
      this.locations[0].latlng = L.latLng(48.8929425, 2.3821873)
      
    },
    stop(data) {
      // console.log(data);
      //console.log(this.$store.state.socket);
      console.log("pasooooo");
      //this.$store.onmessage = (data) => console.log(data)
      //this.$store.dispatch('sendMessage', data);

      this.message = 'Hi How Are';

      this.$store.dispatch('sendMessage', data);

      var lat = this.$store.state.socket.message.geometry.coordinates[0]
      var lon = this.$store.state.socket.message.geometry.coordinates[1]

      this.message = lat + " - " + lon;

      this.locations[0].latlng = L.latLng(lat, lon)


    },
    messageReceived: function(raw_message) {
      //var p = this.$store.state.message

      console.log("XXXXXXXXXXXXXXX")
      
    },

  },
  data() {
    return {
      locations,
      icon,
      zoom: 20,
      center: L.latLng(48.8929425, 2.3821873),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
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
