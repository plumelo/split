import { fromRollup } from '@web/dev-server-rollup'
import { esbuildPlugin } from '@web/dev-server-esbuild'

const esbuild = fromRollup(esbuildPlugin)

export default {
  nodeResolve: true,
  plugins: [
    esbuild({
      ts: true,
      target: 'esnext'
    })
  ]
}
