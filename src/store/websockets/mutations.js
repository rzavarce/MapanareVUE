export function SOCKET_ONOPEN (state, event) {
  let vm = this;
  vm.prototype.$socket = event.currentTarget;
  state.socket.isConnected = true;
}
export function SOCKET_ONCLOSE (state, event) {
  state.socket.isConnected = false;
}
export function SOCKET_ONERROR (state, event) {
  console.error(state, event);
}
// default handler called for all methods
export function SOCKET_ONMESSAGE (state, message) {
  state.socket.message = message;
}
// mutations for reconnect methods
export function SOCKET_RECONNECT (state, count) {
  console.info(state, count);
}
export function SOCKET_RECONNECT_ERROR (state) {
  state.socket.reconnectError = true;
}
