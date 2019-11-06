cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-background-fetch.BackgroundFetch",
      "file": "plugins/cordova-plugin-background-fetch/www/BackgroundFetch.js",
      "pluginId": "cordova-plugin-background-fetch",
      "clobbers": [
        "window.BackgroundFetch"
      ]
    },
    {
      "id": "cordova-background-geolocation-lt.BackgroundGeolocation",
      "file": "plugins/cordova-background-geolocation-lt/www/BackgroundGeolocation.js",
      "pluginId": "cordova-background-geolocation-lt",
      "clobbers": [
        "window.BackgroundGeolocation"
      ]
    },
    {
      "id": "cordova-background-geolocation-lt.API",
      "file": "plugins/cordova-background-geolocation-lt/www/API.js",
      "pluginId": "cordova-background-geolocation-lt"
    },
    {
      "id": "cordova-background-geolocation-lt.DeviceSettings",
      "file": "plugins/cordova-background-geolocation-lt/www/DeviceSettings.js",
      "pluginId": "cordova-background-geolocation-lt"
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-background-fetch": "5.6.1",
    "cordova-background-geolocation-lt": "3.3.0",
    "cordova-plugin-whitelist": "1.3.4"
  };
});