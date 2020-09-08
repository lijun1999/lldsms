module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset"
  ],
  'env': {
    'development': {
      'plugins': ['dynamic-import-node']
    },
    'production': {
      'plugins': [
        'transform-remove-console',
        [
              "component",
              {
                libraryName: "element-ui",
                styleLibraryName: "theme-chalk"
              }
            ]
      ]
    }
  }
}
