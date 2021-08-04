<template>
  <div>
    <v-map :zoom="zoom" :center="center" ref="MapView">
      <v-tilelayer :url="map_server_url" :attribution="attribution"></v-tilelayer>
      <v-icondefault />

      <l-control :position="'topleft'">
        <div class="leaflet-control-simpleMapScreenshoter leaflet-control" style="margin: 0px;">
          <a class="leaflet-control-simpleMapScreenshoter-btn" style="background-image: url('focus.png');" 
          v-on:click="center_map()"></a>
        </div>        
      </l-control>

      <l-control-fullscreen position="topleft"/>

      <v-locatecontrol/>


      <l-moving-rotated-marker
          v-for="l in locations"
          :key="l.id"
          :lat-lng="l.latlng"
          :icon="icon"
          ref="trackingMarkers"
          :duration="duration"
          :rotationAngle="0"
          :keep-at-center="keepAtCenter"
      >



      <v-popup :content="l.text" />

      
      </l-moving-rotated-marker>
    </v-map>
    
    <button v-on:click='start()'>Start</button>
    <button v-on:click='stop("esta es uan prueba")'>Stop</button>
    <div>{{ message }}</div>

  </div>
  

</template>

<script>  

import { LMap, LTileLayer, LIconDefault, LMarker, LPopup, LTooltip, LControl } from "vue2-leaflet";
// import LMovingMarker from 'components/MovingMarker.vue'

import LMovingRotatedMarker from 'vue2-leaflet-moving-rotated-marker'


import {SimpleMapScreenshoter} from 'leaflet-simple-map-screenshoter';

import "leaflet-geosearch/assets/css/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import LControlFullscreen from 'vue2-leaflet-fullscreen';

import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'

import axios from "axios";
import Vue from 'vue';

function rand(n) {
  const max = n + 0.01
  const min = n - 0.01
  return Math.random() * (max - min) + min
}

// TODO en el login se debe recibir toda info de los vehiculos y ese arreglo debera ser guardada en el store para usarlo en todos lados
const locations = []
const fitBounds = []
for (let i = 0; i < 10; i++) {

  let lat = rand(48.8929425)
  let lon = rand(2.3821873)


  locations.push({
    id: i,
    latlng: L.latLng(lat, lon),
    text: `<div>
            <div><b>Moving Marker #` + i + `</b></div><div>
            <b>Address:</b> Calle de la Granja de San idelfonso, 38.</div>
            <div><b>Driver:</b> Roger Zavarce.</div>
            <div><b>Details</b></div>
            <div>
              <span onclick='alert()'><i class='material-icons popup_icon' style='font-size:30px; margin:5px; color:green;' onmouseover='this.style.color=\"orange\"; this.style.cursor=\"pointer\";' onmouseout='this.style.color=\"green\"' >visibility</i></span> 
              <span onclick='alert()'><i class='material-icons popup_icon' style='font-size:30px; margin:5px; color:green;' onmouseover='this.style.color=\"orange\"; this.style.cursor=\"pointer\";' onmouseout='this.style.color=\"green\"' >directions</i></span> 
              <span onclick='alert()'><i class='material-icons popup_icon' style='font-size:30px; margin:5px; color:green;' onmouseover='this.style.color=\"orange\"; this.style.cursor=\"pointer\";' onmouseout='this.style.color=\"green\"' >pin_drop</i></span> 
              <span onclick='alert()'><i class='material-icons popup_icon' style='font-size:30px; margin:5px; color:green;' onmouseover='this.style.color=\"orange\"; this.style.cursor=\"pointer\";' onmouseout='this.style.color=\"green\"' >touch_app</i></span> 
              <span onclick='alert()'><i class='material-icons popup_icon' style='font-size:30px; margin:5px; color:green;' onmouseover='this.style.color=\"orange\"; this.style.cursor=\"pointer\";' onmouseout='this.style.color=\"green\"' >settings</i></span> 
            </div> 
          </div>`,
  })

  fitBounds.push([lat, lon]);

}

const icon = L.icon({
  // iconUrl:'https://s3-eu-west-1.amazonaws.com/ct-documents/emails/A-static.png',
  iconUrl: 'marker_black.png',
  iconSize: [21, 31],
  iconAnchor: [10.5, 31],
  popupAnchor: [4, -25],
})

export default {
  name: "MapApp",
  components: {
    "v-map": LMap,
    "v-tilelayer": LTileLayer,
    "v-icondefault": LIconDefault,
    "v-popup": LPopup,
    "v-tooltip": LTooltip,
    //"v-moving-marker": LMovingMarker,
    LMovingRotatedMarker,
    LControl,
    LControlFullscreen,
    'v-locatecontrol': Vue2LeafletLocatecontrol,
    
  },
  props: {
    duration: { type: Number, default: 2000 },
    keepAtCenter: { type: Boolean, default: false }
  },
  methods: {
    center_map() {
      
      this.map.fitBounds(fitBounds);
      
    },
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

  },
  mounted(){

    this.map = this.$refs.MapView.mapObject;

    // SET SCREEN MAP SNAPSHUTER 
    let pluginOptions = {
       cropImageByInnerWH: true, // crop blank opacity from image borders
       hidden: false, // hide screen icon
       preventDownload: false, // prevent download on button click
       domtoimageOptions: {}, // see options for dom-to-image
       position: 'topleft', // position of take screen icon
       screenName: 'Mapanare_MapView_Snapshot', // string or function
       // iconUrl: ICON_SVG_BASE64, // screen btn icon base64 or url
       hideElementsWithSelectors: ['.leaflet-control-container'], // by default hide map controls All els must be child of _map._container
       mimeType: 'image/png', // used if format == image,
       caption: null, // string or function, added caption to bottom of screen
       captionFontSize: 15,
       captionFont: 'Arial',
       captionColor: 'black',
       captionBgColor: 'white',
       captionOffset: 5,
    };

    new SimpleMapScreenshoter(pluginOptions).addTo(this.map);

    // SET SEARCH ADDRESS IN MAP
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      showMarker: false,
      // style: 'bar', // optional: bar|button  - default button
      // autoComplete: true, // optional: true|false  - default true
      // autoCompleteDelay: 250, // optional: number      - default 250
      maxSuggestions: 10,
      autoClose: true,
      searchLabel: 'Enter address',
      notFoundMessage: 'Address not found',
      animateZoom: true
    });

    this.map.addControl(searchControl);

    // CENTER MAP AND ADJUST WITH MARKERS
    this.map.fitBounds(fitBounds);

    // SET STORE TO UPDATE POSITION IN A MARKER
    this.$options.sockets.onmessage = (message) => {
      var data = JSON.parse(message.data)

      var lat = data.geometry.coordinates[0]
      var lon = data.geometry.coordinates[1]
      this.message = lat + " - " + lon;

      this.locations[0].latlng = L.latLng(lat, lon)
      
      console.log("sending position by websockets " + this.message)
      
    }

  },
  data() {
    return {
      map: {},
      locations,
      fitBounds: [],
      icon,
      map_server_url: process.env.ENV_SERVER_MAP_URL,
      attribution: process.env.ENV_MAP_ATTIBUTIONS,
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
  height: 90vh;
}


.example-custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
}
.custom-control-watermark {
  font-size: 200%;
  font-weight: bolder;
  color: #aaa;
  text-shadow: #555;
}

.leaflet-control-geosearch form input {
  height: 30px;
}

.popup_icon {
  font-size: 50px;

}

</style>
