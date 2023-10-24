import {
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default {
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true
    }),
    presetTypography()
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerCompileClass(),
    transformerAttributifyJsx()
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-center-col': 'flex flex-col justify-center items-center',
    'li-common': 'cursor-pointer flex justify-between items-center h-7',
    'base-color':
      'bg-gray-100 text-black dark:bg-#18181c dark:text-white transition-colors duration-300',
    'base-text': 'text-#333 dark:text-white'
  }
}
