const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  
  const config = await createExpoWebpackConfigAsync(
    {
      
      ...env,
       
      // Passing true will enable the default Workbox + Expo SW configuration.
      offline: true,
      
    },
    
    argv
  );
  config.performance = {
      ...config.performance,
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
  };
  // config.resolve.alias['react-native'] = 'react-native-web';
  // config.resolve.alias['react-native-maps'] = 'react-native-web-maps';
  
  // Customize the config before returning it.
  return config;
};
