import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import clear from 'rollup-plugin-clear'
import pkg from "./package.json";

export default [
    {
        input: "src/index.ts",
        output: {
            name: "cloudbuild",
            file: pkg.main,
            format: "cjs",
            exports: "auto"
        },
        plugins: [
            clear({
                targets: ['dist'],
                watch: true,
            }),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
        ],
    },
];
