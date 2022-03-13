module.exports = {
  presets: [
    ['@babel/preset-env', {}],
    ['@vue/babel-preset-jsx']
  ],
  plugins: [
    ["@babel/proposal-decorators", { "legacy": true }],
    ["@babel/proposal-class-properties", { "loose": true }]
  ]
}
