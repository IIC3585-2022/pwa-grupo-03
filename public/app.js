
/* Regisration */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
  navigator.serviceWorker.register('sw.js')
}

// TODO: Implementar notificaciones
