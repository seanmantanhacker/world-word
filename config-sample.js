var config = {};

config.development = {
   host: '', //run in oyeng.online
   port: '3556',
   mysql: {
      host: "127.0.0.1",
      port: "3306",
      database: "",
      user: "root",
      password: ""
   },
   is_staging: false,
};

var configName = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : 'development';
var selectedConfig = typeof (config[configName]) == 'object' ? config[configName] : config.local;
module.exports = selectedConfig;