import { URL, fileURLToPath } from 'node:url'

import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Component from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  plugins: [
    vue({ reactivityTransform: true }),
    vueJsx(),
    Component({
      dirs: ['src/components', 'src/**/components'],
      dts: path.resolve(pathSrc, 'types/component.d.ts')
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dirs: [path.resolve(pathSrc, 'composable')],
      dts: path.resolve(pathSrc, 'types/component.d.ts')
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true
        }),
        presetTypography()
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()],
      shortcuts: {
        'flex-center': 'flex justify-center items-center',
        'flex-center-col': 'flex flex-col justify-center items-center',
        'li-common': 'cursor-pointer flex justify-between items-center h-7',
        'base-color':
          'bg-gray-100 text-black dark:bg-#18181c dark:text-white transition-colors duration-300'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
