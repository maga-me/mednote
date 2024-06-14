import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'
const vuetify = createVuetify({
  components,
  directives,
})
import router from './router'

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
