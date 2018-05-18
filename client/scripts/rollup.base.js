import fs from "fs";
import babel from "rollup-plugin-babel";
import eslint from "rollup-plugin-eslint";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pathmodify from "rollup-plugin-pathmodify";
import styles from "rollup-plugin-stylus-css-modules";
import postcss from "rollup-plugin-postcss";

export const pkg = JSON.parse(fs.readFileSync("./package.json"));
if (!pkg) {
  throw("Could not read package.json");
}
const env = process.env; // eslint-disable-line no-undef
const input = env.INPUT || "index.js";
const name = env.NAME || pkg.name;
const external = Object.keys(pkg.dependencies || {});

const globals = {};

external.forEach(ext => {
  switch (ext) {
  case "mithril":
    globals["mithril"] = "m";
    break;
  default:
    globals[ext] = ext;
  }
});

export const createConfig = ({ includeDepencies }) => ({
  input,
  external: includeDepencies ? [] : external,
  output: {
    name,
    globals,
  },
  watch: {
    clearScreen: false
  },
  plugins: [
    postcss({
      modules: true
    }),
    // Resolve libs in node_modules
    resolve({
      jsnext: true,
      main: true,
      external: includeDepencies ? [] : external
    }),

    pathmodify({
      aliases: [
        {
          id: "mithril/stream",
          resolveTo: "node_modules/mithril/stream.js"
        }
      ]
    }),

    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    commonjs({
      include: "node_modules/**"
    }),

    eslint({
      cache: true
    }),

    babel()
  ]
});