const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const { assetExts, sourceExts } = config.resolver;

config.resolver.assetExts = assetExts.filter(
    (ext) => ext !== 'svg'
);

config.resolver.sourceExts = [
    ...sourceExts,
    'svg',
];

config.transformer.babelTransformerPath = require.resolve(
    'react-native-svg-transformer/expo'
);

module.exports = config;