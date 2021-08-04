
/*
import VueNativeSock from 'vue-native-websocket'

import store from '../store'


export default async ({ app, router, store, Vue }) => {
  // if(store.state.isAuthenticated){
    let url = (process.env.ENV_GEOSERVER_URL.substring(0,4)==="https):"?"wss://":"ws://") 
    + process.env.ENV_GEOSERVER_URL.substring(7) + '/ws';

    Vue.use(VueNativeSock, url, { 
      store: store,
      //format: 'json',
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000
    })
  // }
}
*/
