const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname, {
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx'], // Adicione 'jsx' e 'tsx' se necessário
  },
});
