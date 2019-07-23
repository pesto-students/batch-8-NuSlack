const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  // Modular style loader
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // Ant Design Theme Overrides
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#ff8080' },
  }),
);
