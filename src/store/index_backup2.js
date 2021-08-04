import Vue from 'vue'
import Vuex from 'vuex'
import VueNativeSock from 'vue-native-websocket'
import websockets from './websockets'


Vue.use(Vuex)
Vue.use(VueNativeSock, 'ws://127.0.0.1:8888/ws', { 
  store: websockets,
  //format: 'json',
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000
})

websockets.$socket = Vue.prototype.$socket

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      websockets
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}

