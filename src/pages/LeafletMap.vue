<template>
  <q-page padding class="flex">
    <q-card style="flex:1">
      <l-map :zoom="zoom" :maxZoom="maxZoom" :minZoom="minZoom" :center="center">
        <!-- <l-control-layers position="topright"  ></l-control-layers> -->
        <q-btn-dropdown
          icon="map"
          style="top:0; right: 0; position: absolute; margin:10px 10px 0 0; background-color:white; z-index:800;"
        >
          <q-list>
            <q-item
              :key="index"
              v-for="(layer, index) in layers"
              @click="currentLayer=index"
              clickable
              v-close-popup
            >
              <q-item-section>
                <q-item-label>{{layer.title}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <l-tile-layer
          :url="layers[currentLayer].url"
          :attribution="layers[currentLayer].attribution"
        ></l-tile-layer>
      </l-map>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
export default {
  name: 'PageIndex',
  components: {
    LMap,
    LTileLayer,
    LMarker
    /* LControlLayers */
  },
  data() {
    return {
      zoom: 3,
      maxZoom: 16,
      minZoom: 3,
      center: L.latLng(46.198185, 6.228155),
      currentLayer: 0,
      layers: [
        {
          title: 'drawing',
          url:
            'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
          attribution:
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        {
          title: 'wikimedia',
          url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
          attribution:
            '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
        },
        {
          title: 'natgeo',
          url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
          attribution:
            'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
        },
        {
          title: 'satellite',
          url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution:
            'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }
      ]
    }
  }
}
</script>