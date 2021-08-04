<template>
  <div>
    <v-map :zoom="zoom" :center="center">
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      <v-marker-cluster v-if="geoJsonLoaded" :options="clusterOptions">
        <v-geo-json :geojson="geojson" :options="geoJsonOptions"></v-geo-json>
      </v-marker-cluster>
    </v-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";
import Vue2LeafletMarkercluster from "vue2-leaflet-markercluster";
import axios from "axios";
// import L from "leaflet";

export default {
  name: "MapApp",
  components: {
    "v-map": LMap,
    "v-tilelayer": LTileLayer,
    "v-geo-json": LGeoJson,
    "v-marker-cluster": Vue2LeafletMarkercluster
  },
  created() {
    axios
      .all([
        axios.get(
          "https://gist.githubusercontent.com/NateM926/b4dd3c8a9b7d90e2ce3fd2807e780909/raw/249f928400eadc0cbcfe562baeadc98141eea40e/cables.geojson"
        ),
        axios.get(
          "https://gist.githubusercontent.com/NateM926/b4dd3c8a9b7d90e2ce3fd2807e780909/raw/249f928400eadc0cbcfe562baeadc98141eea40e/buildings.geojson"
        )
      ])
      .then(
        axios.spread((cables, buildings) => {
          this.geojson = [cables.data, buildings.data];
          this.geoJsonLoaded = true;
        })
      );
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
      }
    };
  }
};
</script>

<style scoped>
@import "https://unpkg.com/leaflet@1.4.0/dist/leaflet.css";
@import "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css";

.leaflet-container {
  height: 97vh;
}
</style>
