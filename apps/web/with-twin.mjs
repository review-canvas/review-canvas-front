import * as path from 'node:path';
import * as url from 'node:url';

import babelPluginTypescript from '@babel/plugin-syntax-typescript';
import babelPluginMacros from 'babel-plugin-macros';
import babelPluginTwin from 'babel-plugin-twin';


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// The folders containing files importing twin.macro
const includedDirs = [path.resolve(__dirname, 'src')];

/** @returns {import('next').NextConfig} */
export default function withTwin(
  /** @type {import('next').NextConfig} */
  nextConfig,
) {
  return {
    ...nextConfig,
    webpack(
      /** @type {import('webpack').Configuration} */
      config,
      options,
    ) {
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];

      config.module.rules.push({
        test: /\.tsx?$/,
        include: includedDirs,
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceMaps: options.dev,
              plugins: [
                babelPluginTwin,
                [
                  babelPluginMacros,
                  {
                    twin: {
                      preset: 'emotion',
                    },
                  },
                ],
                [babelPluginTypescript, { isTSX: true }],
              ],
            },
          },
        ],
      });

      if (typeof nextConfig.webpack === 'function') return nextConfig.webpack(config, options);

      return config;
    },
  };
}
