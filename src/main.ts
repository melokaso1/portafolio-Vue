import { createApp } from 'vue'
import App from './App.vue'
import { vReveal } from './directives/reveal'
import { installPrimeVue } from './plugins/primevue'
import './lib/gsap'
import './style.css'

const app = createApp(App)
installPrimeVue(app)
app.directive('reveal', vReveal).mount('#app')
