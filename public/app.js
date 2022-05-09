/* Regisration */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
  navigator.serviceWorker.register('sw.js')
}

// setInterval(, 1000)


// let deferredPrompt;
// const btnAdd = document.getElementById('btnAdd')
// window.addEventListener('beforeinstallprompt', evt => {
//   console.log('beforeinstall')
//   evt.preventDefault()
//   deferredPrompt = evt
//   btnAdd.style.display = 'block'
// })

// btnAdd.addEventListener('click', () => {
//   console.log('Ouch')
//   deferredPrompt.prompt()
//   deferredPrompt.userChoice.then(choice => {
//     if (choice.outcome === 'accepted')
//       console.log('Instalar!')
//     deferredPrompt = null
//   })
// })

// window.addEventListener('appinstalled', () => {
//   app.logEvent('a2hs', 'installed')
// })
