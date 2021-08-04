import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueNativeSock from 'vue-native-websocket'

Vue.use(Vuex)


Vue.use(VueNativeSock, 'ws://127.0.0.1:8888/ws', {
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
})

Vue.prototype.$socket.onmessage = (data) => {
  console.log(data);
  console.log("pasooooooooooooooo");
}

// Make Axios play nice with Django CSRF
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default new Vuex.Store({
  state: {
    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem('token'),
    endpoints: {
      // TODO: Remove hardcoding of dev endpoints
      obtainJWT: 'http://127.0.0.1:8000/api/v1/auth-jwt/',
      refreshJWT: 'https://127.0.0.1:8000/api/v1/auth/refresh_token/',
      baseUrl: 'https://127.0.0.1:8000/api/v1/'
    },
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    }
  },

  mutations: {
    setAuthUser(state, {
      authUser,
      isAuthenticated
    }) {
      Vue.set(state, 'authUser', authUser)
      Vue.set(state, 'isAuthenticated', isAuthenticated)
    },
    updateToken(state, newToken) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.setItem('token', newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.removeItem('token');
      state.jwt = null;
    },




    //////NO SE USA ACTUALEMENTE SE DEBE MEJORAR /////////////////////////////7
    SOCKET_ONOPEN (state, event)  {
      let vm = this;
      vm.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
      console.log("El token se ha abierto");
      
    },

    SOCKET_ONCLOSE (state, event)  {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, event)  {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message)  {
      console.log("Ha llegado un nuevo mensage");
      state.socket.message = message
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    //////////////////////////////////////
  },
  actions: {
    sendMessage: function(context, message) {

      Vue.prototype.$socket.send(message)


    },
    setSocketMessage({ commit }, params) {
        commit('SOCKET_ONMESSAGE', params);
    },
  }
})
