import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './assets/main.scss'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import router from './router'
;(function setupApp() {
  const app = createApp(App).use(createPinia())
  app.use(router)
  resolveNaiveAndTailWindConflict()
  app.mount('#app')
})()

// https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
function resolveNaiveAndTailWindConflict() {
  // We use tailwind reset as Unocss reset
  // But some of reset style will replace some of naive=ui style
  // To following the docs, we need to do this:
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.append(meta)
}
