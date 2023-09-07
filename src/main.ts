import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'animate.css'
import './style/override.css'
import { setupRouter } from './router'
;(async function setupApp() {
  const app = createApp(App).use(createPinia())
  await setupRouter(app)
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
