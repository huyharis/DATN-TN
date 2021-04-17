module.exports = {
  presets: ['module:babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png'
        ],
        alias: {
          '@store': './src/store',
          '@components': './src/components',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@actions': './src/actions',
          '@constants': './src/constants',
          '@reducers': './src/reducers',
          '@utils': './src/utils',
          '@sagas': './src/sagas',
          '@storages': './src/storages',
          '@navigation': './src/navigator',
          '@services': './src/services'
        }
      }
    ]
  ]
};