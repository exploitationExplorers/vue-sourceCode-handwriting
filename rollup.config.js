import babel from 'rollup-plugin-babel'
export default {
    input: 'src/index.js',
    output: {
        file: './dist/vue.js',
        name: 'Vue', // global.Vue
        format: 'umd',
        sourcemap: true, // 希望可以调试源代码
    },
    plugins: [
        babel({
            exclude: 'node_modules/**', // 排除node_modules
        })
    ]
}