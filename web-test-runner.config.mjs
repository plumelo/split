import { esbuildPlugin } from '@web/dev-server-esbuild'

export default {
  files: 'test/**/*.test.js',
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'auto'
    })
  ],
  testFramework: {
    config: {
      timeout: 5000
    }
  }
}
