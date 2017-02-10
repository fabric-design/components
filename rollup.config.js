import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'preact-components/index.js',
  dest: 'lib/preact-bundle.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
	nodeResolve({
		jsnext: true,
		main: true,
		browser: true,
		extensions: [ '.js', '.json', '.ts', '.tsx' ]
	}),
	commonjs({
		namedExports: {
			'node_modules/react-dom/index.js': ['render' ],
			'node_modules/react/react.js': ['Component', 'createElement' ]
		}
	})
  ]
};