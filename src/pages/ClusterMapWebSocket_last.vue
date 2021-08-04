<template>
  <div>
    <v-map :zoom="zoom" :center="center" ref="myMap">
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      <v-marker-cluster ref="clusterRef" v-if="geoJsonLoaded" :options="clusterOptions">
        <v-geo-json :geojson="geojson" :options="geoJsonOptions"></v-geo-json>

        <v-geo-json v-for="sector in geoSectors" :key="sector.id" :geojson="sector" :options="options"/>

      </v-marker-cluster>
      <v-control-fullscreen/></v-control-fullscreen>
      <v-geosearch :options="geosearchOptions" ></v-geosearch>
    </v-map>
    <h4>Vue.js WebSocket Tutorial</h4> 
    <button v-on:click="sendMessage('hello')">Send Message</button>
    <button v-on:click='add'>Add
    </button>
    <button v-on:click='remove'>Remove last
    </button>
  </div>
</template>

<script>
import { LMap, LTileLayer, LGeoJson, LIconDefault, LMarker, LPopup } from "vue2-leaflet";
import Vue2LeafletMarkercluster from "vue2-leaflet-markercluster";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import VGeosearch from 'vue2-leaflet-geosearch';
import LControlFullscreen from 'vue2-leaflet-fullscreen';
import axios from "axios";
import L from "leaflet";

export default {
  name: "MapApp",
  components: {
    "v-map": LMap,
    "v-tilelayer": LTileLayer,
    "v-geo-json": LGeoJson,
    'v-icondefault': LIconDefault,
    'v-marker': LMarker,
    'v-popup': LPopup,
    "v-marker-cluster": Vue2LeafletMarkercluster,
    "v-control-fullscreen":LControlFullscreen,
    "v-geosearch": VGeosearch,
  },
  methods: {
    sendMessage: function(message) {
      console.log("Hello")
      // console.log(this.connection);
      this.connection.send(message);
      // markers.refreshClusters();
      //this.geojson = [cables.data, buildings.data];
      //this.geoJsonLoaded = true;
    },
    add() {
      this.markers.push(L.latLng(Math.random() + 47, -1 + Math.random()));
    },
    remove() {
      this.markers.splice(-1, 1);
    },
    click: (e) => console.log("clusterclick", e),
    
    ready: (e) => console.log('ready', e),

  },
  mounted () {
    // DO
    axios
      .all([
        axios.get(
          "https://gist.githubusercontent.com/NateM926/b4dd3c8a9b7d90e2ce3fd2807e780909/raw/249f928400eadc0cbcfe562baeadc98141eea40e/buildings.geojson"
        )
      ])
      .then(
        axios.spread((buildings) => {
          this.geojson = [buildings.data];
          this.geoJsonLoaded = false;
        })
      );
  },
  created() {
    
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("ws://127.0.0.1:8888/ws")

    // map_test = this.$refs.myMap.mapObject;
    // this.connection.onmessage = function(event) {

    this.connection.onmessage = (event)=>{
      // console.log(event.data);
      // console.log(this)
      console.log("XXXXXXXXXXXXXXXXX");
      axios
        .all([
          axios.get(
            "https://gist.githubusercontent.com/NateM926/b4dd3c8a9b7d90e2ce3fd2807e780909/raw/249f928400eadc0cbcfe562baeadc98141eea40e/buildings.geojson"
          )
        ])
        .then(
          axios.spread((cables) => {
            console.log("DATAAAAAA");
            console.log(cables.data);
            this.geojson = [cables.data];
            this.geoJsonLoaded = true;
          })
      );
      
      // this.map.refreshClusters(event.data);
      // map_test.refreshClusters();
      // this.markers.refreshClusters()
      // this.$refs.clusterRef.mapObject.refreshClusters()
      // this.$refs.clusterRef.mapObject.refreshClusters(event.data);
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }
    

  },
  data() {
    return {
      zoom: 12,
      center: L.latLng(43.657019, -70.25949),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      clusterOptions: {
        disableClusteringAtZoom: 18,
        chunkedLoading: true
      },
      geosearchOptions: { // Important part Here
        style: 'bar',
        provider: new OpenStreetMapProvider(),
        autoClose: true,
        animateZoom: true, 
      },
      geojson: null,
      geoJsonLoaded: false,
      geoJsonOptions: {
        style: feature => {
          if (feature.properties.OWNER === "GWI") {
            return { color: "#0c38dd" };
          } else if (feature.properties.OWNER === "Zayo") {
            return { color: "#ff6e00" };
          } else if (feature.properties.OWNER === "XO") {
            return { color: "#8c08dd" };
          } else {
            return { color: "#000000" };
          }
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties.OWNER) {
            layer.bindPopup("Fiber Cable Owner: " + feature.properties.OWNER);
          } else {
            layer.bindPopup(
              "Lit Building Address: " + feature.properties.ADDRESS
            );
          }
        }
      },
      
    };
  }
};
</script>

<style scoped>
@import "https://unpkg.com/leaflet@1.4.0/dist/leaflet.css";
@import "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css";
@import "https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css";

.leaflet-container {
  height: 97vh;
}
</style>
