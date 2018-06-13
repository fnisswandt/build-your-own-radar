const radar = require("./default/radar.json");

require("./images/logo.png");
require('./common');
require('./images/radar_legend.png');

const Site = require('./util/factory');

Site().build(radar);
