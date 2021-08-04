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
      >
        
        <v-popup :content="l.text" />
      
      </v-moving-marker>

      <button v-on:click='start'>Start</button><button v-on:click='stop'>Stop</button>

    </v-map>

  </div>
</template>

<script>
import { LMap, LTileLayer, LGeoJson, LIconDefault, LMarker, LPopup } from "vue2-leaflet";
import LMovingMarker from 'vue2-leaflet-movingmarker'

import axios from "axios";
// import L from "leaflet";


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
    "v-moving-marker": LMovingMarker,
  },
  props: {
    duration: { type: Number, default: 2000 },
    keepAtCenter: { type: Boolean, default: false }
  },
  methods: {
    start() {
      
    },
    stop() {
      
    },

  },
  mounted () {
    console.log("Mount Map");
   
  },
  created() {
    console.log("Create Map");


  },
  data() {
    return {
      locations,
      icon,
      zoom: 12,
      center: L.latLng(48.8929425, 2.3821873),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      interval: null

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
          this.interval = setInterval(() => {
            setRandomLatLng()
          }, value)
          setRandomLatLng()
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
  height: 97vh;
}
</style>
