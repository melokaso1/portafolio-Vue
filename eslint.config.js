import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    rules: {
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
    },
  },
  {
    // Componentes copiados de Vue Bits: se mantienen lo más parecidos posible al original.
    files: ['src/components/vue-bits/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/attributes-order': 'off',
    },
  },
)
