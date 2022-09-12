import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import autoprefixer from 'autoprefixer'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import packageJson from './package.json'

export default {
	input: './src/index.tsx',
	output: [
		{
			file: packageJson.main,
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: packageJson.module,
			format: 'esm',
			sourcemap: true,
		},
	],
	external: ['react', 'react-use'],
	plugins: [
		peerDepsExternal(),
		resolve(),
		commonjs(),
		typescript(),
		postcss({
			plugins: [autoprefixer()],
			sourceMap: true,
			extract: true,
			minimize: true,
		}),
	],
}
