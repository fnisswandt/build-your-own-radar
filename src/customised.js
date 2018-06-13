const radar = require("./custom/radar.json");

require("./custom/logo.png");
require('./common');
require('./images/radar_legend.png');

const Site = require('./util/factory');

Site().build(radar);
