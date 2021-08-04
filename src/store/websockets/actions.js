import Vue from 'vue'

export function sendMessage (context, message) {
	

      Vue.prototype.$socket.send(message)


    
}
