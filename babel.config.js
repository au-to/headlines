module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // vant配置
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      // 指定样式路径
      style: (name) => `${name}/style/less`
    }]
  ]
}
