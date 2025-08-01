import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dotenv from 'dotenv';
dotenv.config(); // これで .env ファイルを読み込む

const extensions = ['.ts', '.js'];

const preventTreeShakingPlugin = () => {
  return {
    name: 'no-treeshaking',
    resolveId(id, importer) {
      if (!importer) {
        // let's not treeshake entry points, as we're not exporting anything in Apps Script files
        return { id, moduleSideEffects: 'no-treeshake' };
      }
      return null;
    },
  };
};

export default {
  input: './src/index.ts',
  output: {
    dir: process.env.ROLLUP_OUTPUT_DIR || './dist/',
    format: 'esm',
  },
  plugins: [
    preventTreeShakingPlugin(),
    nodeResolve({
      extensions,
    }),
    babel({ extensions, babelHelpers: 'runtime' }),
  ],
};
