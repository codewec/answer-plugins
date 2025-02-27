/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import dts from 'vite-plugin-dts';

import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    ViteYaml(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: 'index.ts',
      name: packageJson.name,
      fileName: (format) => `${packageJson.name}.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-i18next',
        'react-bootstrap',
        '@rainbow-me/rainbowkit',
        '@tanstack/react-query',
        'viem',
        'wagmi',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-i18next': 'reactI18next',
          'react-bootstrap': 'reactBootstrap',
          '@rainbow-me/rainbowkit': 'rainbow-meRainbowkit',
          '@tanstack/react-query': 'tanstackReactQuery',
          'viem': 'viem',
          'wagmi': 'wagmi',
        },
      },
    },
  },
});
